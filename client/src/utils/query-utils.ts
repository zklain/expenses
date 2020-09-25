import {
  ExpanseCategoryCount,
  ExpenseDocType,
  MonthsAvg,
} from '../@types/expense';
import moment from 'moment';
import { MangoQuery } from 'rxdb/dist/types/types';
import { displayPrice } from '../utils/prices';
import { categoriesList } from '../components/Expense/CategoryIcon';

/**
 * Count sum of Expanse documents.
 *
 * @param expanses
 * @returns sum of amounts.
 */
export const countTotal = (expanses: ExpenseDocType[] | undefined) => {
  if (!expanses) {
    return 0;
  }
  const sum = expanses.reduce((acc, curr) => acc + curr.amount, 0);
  return sum;
};

/**
 * Get a ISOString date specified by months back.
 *
 * @param monthsBack number of months back from the current month.
 * @returns a object containing a `from` and `to` strings,
 * representing the current (to) and previous (from) date.
 */
export const getMonthStartEnd = ({
  startDate = new Date(),
  monthsBack = 0,
}: {
  startDate?: string | Date;
  monthsBack?: number;
}): { start: string; end: string } => {
  // todo: check if date

  const start = moment(startDate)
    .subtract(monthsBack, 'month')
    .startOf('months')
    .format();
  const end = moment(startDate)
    .subtract(monthsBack, 'month')
    .endOf('months')
    .format();
  return { start, end };
};

/**
 * Counts months difference of two dates.
 * Uses moment.js
 *
 * @param start starting date
 * @param end ending date
 * @returns number of months.
 */
//@ts-ignore
export const countMonthsDiff = (
  start: string | Date,
  end: string | Date
): number => {
  return Math.abs(moment(end).diff(start, 'months'));
};

/**
 * Builds a query for date range using the createdAt document property.
 *
 * @param args
 * @param args.from the startting date.
 * @param args.to
 * @returns Created MangoDB query object.
 */
export const buildDateRangeQry = ({
  from,
  to,
}: {
  from: string;
  to: string;
}): MangoQuery<ExpenseDocType> => {
  return { selector: { createdAt: { $gte: from, $lte: to } } };
};

/**
 * Count how many months does an Expenses documents array contain.
 * @param docs
 * @returns number of months
 */
const countMonths = (docs: ExpenseDocType[]): number => {
  if (!docs) {
    throw new Error(`Argument error: docs can't be null!`);
  }

  if (!docs.length) return 0;

  if (docs.length === 1) return 1;

  const counted = Math.abs(
    moment(docs[0].createdAt).diff(docs[docs.length - 1].createdAt, 'months')
  );

  return counted === 0 ? 1 : counted;
};

/**
 * Counts average monthly expenses and total for each month.
 * Used in the bar chart.
 *
 * @param docs
 * @returns MonthsAvg
 */
export const countMonthsAvg = (
  docs: ExpenseDocType[] | undefined
): MonthsAvg => {
  // if (!docs) {
  //   throw new Error('Docs cannot be null!');
  // }

  if (!docs || !docs.length) {
    return {
      avg: 0,
      months: [],
    };
  }

  const ofMonths = countMonths(docs);

  let months: any = [];

  const lastMonth = docs[docs.length - 1].createdAt;

  if (ofMonths === 1) {
    const total = displayPrice(countTotal(docs));
    months.push({
      total: total,
      name: moment(docs[0].createdAt).format('MMM'),
    });
  } else {
    for (let monthsBack = ofMonths; monthsBack >= 0; monthsBack--) {
      let { start, end } = getMonthStartEnd({
        startDate: lastMonth,
        monthsBack,
      });
      const forMonth = docs.filter(
        (doc) =>
          moment(doc.createdAt).isSameOrAfter(start, 'days') &&
          moment(doc.createdAt).isSameOrBefore(end, 'days')
      );
      const monthTotal = displayPrice(countTotal(forMonth));

      months.push({
        total: monthTotal,
        name: moment(forMonth[0].createdAt).format('MMM'),
      });
    }
  }

  const total = displayPrice(countTotal(docs));
  const avg = Math.round((total * 100) / docs.length);

  return {
    avg,
    months,
  };
};

export const countForCategory = (
  data: ExpenseDocType[] | undefined
): ExpanseCategoryCount[] => {
  if (!data || !data.length) {
    return [];
  }
  const total = countTotal(data);
  const categoriesCounted: ExpanseCategoryCount[] = [];
  for (const c of categoriesList) {
    const ofCategory = data.filter((e) => e.category === c);
    if (ofCategory.length) {
      const sum = countTotal(ofCategory);
      const percentage = Math.round((sum / total) * 100);
      categoriesCounted.push({ id: c, sum, percentage });
    }
  }

  return categoriesCounted;
};

/**
 * Group months expenses by day.
 *
 * @param docs monthly expense
 * @returns array of Expense document arrays
 */
export const groupByDay = (docs: ExpenseDocType[]): Array<ExpenseDocType[]> => {
  if (!docs.length) return [];

  let grouped: Array<ExpenseDocType[]> = [];
  let i = docs.length - 1;
  let forDay = new Date(docs[i].createdAt).getDate();
  let docsForDay: ExpenseDocType[] = [];
  while (i >= 0) {
    let currentDocDay = new Date(docs[i].createdAt).getDate();
    if (forDay === currentDocDay) {
      docsForDay.push(docs[i]);
      if (i === 0) {
        grouped.push(docsForDay);
      }
      i--;
    } else {
      grouped.push(docsForDay);
      docsForDay = [];
      forDay = new Date(docs[i].createdAt).getDate();
    }
  }

  return grouped;
};
