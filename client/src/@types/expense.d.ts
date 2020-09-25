import { RxDocument, RxCollection, RxJsonSchema, RxDatabase } from 'rxdb';

export type ExpenseDocType = {
  id: string;
  amount: number;
  category?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
};

export type ExpenseMethods = {};

export type ExpenseDocument = RxDocument<ExpenseDocType, ExpenseMethods>;

export type ExpenseCollectionMethods = {
  countTotal: () => Promise<number>;
};

export type ExpensesCollection = RxCollection<
  ExpenseDocType,
  ExpenseMethods,
  ExpenseCollectionMethods
>;

export type ExpenseDatabaseCollection = {
  expenses: ExpensesCollection;
};

export type ExpensesDatabase = RxDatabase<ExpenseDatabaseCollection>;

// create a showNext (week, month) which would be recalculated after each query change
export type MonthCount = {
  name: string;
  total: number;
};

export type MonthsAvg = {
  avg: number;
  months: MonthCount[];
};

export type ExpanseCategoryCount = {
  id: string;
  sum: number;
  percentage: number;
};
