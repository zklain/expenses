import { useEffect, useContext, useReducer } from 'react';
import { ExpenseDocType } from '../../@types/expense';
import { Subscription } from 'rxjs/internal/Subscription';
import { buildDateRangeQry, getMonthStartEnd } from '../../utils/query-utils';
import { DatabaseContext } from '../../db/DatabaseContext';
import moment from 'moment';
import { MangoQuery } from 'rxdb/dist/types/types';
import { ExpensesState, reducer } from './useExpenses.reducer';

const { start, end } = getMonthStartEnd({ monthsBack: 0 });

const useExpensesInitState: ExpensesState = {
  loading: true,
  query: buildDateRangeQry({ from: start, to: end }),
  monthsBack: 0,
  currentMonthName: moment(start).format('MMMM'),
  shown: [],
  total: 0,
  year: '',
};

export const setYear = (shown: ExpenseDocType[]): string | undefined => {
  if (!shown.length) return;
  const year = new Date(shown[0].createdAt).getFullYear();

  if (year !== currentYear) {
    return String(year).substring(2, 4);
  } else {
    return '';
  }
};

const currentYear = new Date().getFullYear();

export const useExpenses = () => {
  const { db, ofMonths } = useContext(DatabaseContext);

  const [state, dispatch] = useReducer(reducer, useExpensesInitState);

  // set expenses
  useEffect(() => {
    let subs: Subscription[] = [];
    if (db) {
      dispatch({ type: 'SET_QUERY_LOADING', payload: true });
      const expensesSub = db.expenses
        .find(state.query)
        .sort({ createdAt: 'desc' })
        .$.subscribe((docs: ExpenseDocType[]) => {
          // @ts-ignore
          const mapped = [...docs.map((d) => d.toJSON())];
          dispatch({ type: 'SET_SHOWN', payload: mapped });
        });
      subs = [...subs, expensesSub];
    }
    return () => {
      subs.forEach((s) => s.unsubscribe());
    };
  }, [db, state.query]);

  const prevMonth = () => {
    dispatch({ type: 'CHANGE_MONTH', payload: 1 });
  };

  const nextMonth = () => {
    dispatch({ type: 'CHANGE_MONTH', payload: -1 });
  };

  const setQuery = (query: MangoQuery) => {
    dispatch({ type: 'SET_QUERY', payload: query });
  };

  return {
    ...state,
    prevMonth,
    nextMonth,
    ofMonths,
    setQuery,
  };
};
