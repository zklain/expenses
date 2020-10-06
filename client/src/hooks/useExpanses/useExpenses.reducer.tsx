import moment from 'moment';
import { MangoQuery } from 'rxdb/dist/types/types';
import { ExpenseDocType } from '../../@types/expense';
import {
  buildDateRangeQry,
  countTotal,
  getMonthStartEnd,
  groupByDay,
} from '../../utils/query-utils';
import { UseExpensesAction } from './useExpense.actions';
import { setYear } from './useExpenses.hook';

export interface ExpensesState {
  loading: boolean;
  query: MangoQuery<ExpenseDocType>;
  monthsBack: number;
  currentMonthName: string;
  shown: Array<ExpenseDocType[]>;
  total: number;
  year: string;
}

export const reducer = (state: ExpensesState, action: UseExpensesAction) => {
  switch (action.type) {
    case 'CHANGE_MONTH':
      const monthsBack = state.monthsBack + action.payload;
      const { start, end } = getMonthStartEnd({ monthsBack });
      const query = buildDateRangeQry({ from: start, to: end });
      const currentMonthName = moment(start).format('MMMM');
      return {
        ...state,
        monthsBack,
        query,
        currentMonthName,
      };
    case 'SET_SHOWN':
      const year = setYear(action.payload);
      const total = countTotal(action.payload);

      const orderedByDay = groupByDay(action.payload);

      return {
        ...state,
        shown: orderedByDay,
        year: year || '',
        total,
        loading: false,
      };
    case 'SET_QUERY_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
