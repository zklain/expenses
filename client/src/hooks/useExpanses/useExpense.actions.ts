export type UseExpensesActionType =
  | 'CHANGE_MONTH'
  | 'SET_SHOWN'
  | 'SET_QUERY_LOADING'
  | 'SET_QUERY';

export type UseExpensesAction = {
  type: UseExpensesActionType;
  payload?: any;
};
