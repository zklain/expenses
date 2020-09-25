import { RxJsonSchema } from 'rxdb';
import { ExpenseDocType } from '../../@types/expense';

export const expenseSchema: RxJsonSchema<ExpenseDocType> = {
  version: 0,
  title: 'Expanse schema',
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    amount: {
      type: 'number',
      default: 0,
    },
    name: { type: 'string', default: 'Expanse' },
    category: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      final: true,
    },
    updatedAt: {
      type: 'string',
    },
  },
  // required: ['amount'],
  indexes: ['createdAt', 'updatedAt', 'category'],
};
