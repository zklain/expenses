import { createRxDatabase, removeRxDatabase, addRxPlugin } from 'rxdb';
import { expenseSchema } from './schemas/expense.schema';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import {
  ExpenseCollectionMethods,
  ExpensesCollection,
  ExpenseDocType,
  ExpenseDocument,
  ExpensesDatabase,
  ExpenseDatabaseCollection,
} from '../@types/expense';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const expansesCollectionMethods: ExpenseCollectionMethods = {
  // TODO: test
  countTotal: async function (this: ExpensesCollection) {
    const allDocs = await this.find().exec();
    return allDocs
      .map((doc: ExpenseDocument) => doc.toJSON())
      .reduce(
        (acc: number, current: ExpenseDocType) => acc + current.amount,
        0
      );
  },
};

addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(require('pouchdb-adapter-idb'));
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBValidatePlugin);

export const createDb = async () => {
  try {
    const db: ExpensesDatabase = await createRxDatabase<
      ExpenseDatabaseCollection
    >({
      name: 'expenses',
      adapter: 'idb',
      multiInstance: false,
      eventReduce: false,
    });
    return db;
  } catch (error) {
    throw error;
  }
};

export const initDb = async () => {
  const db = await createDb();
  const collection = await db.collection({
    name: 'expenses',
    schema: expenseSchema,
  });

  return { db, collection };
};

let dbPromise: Promise<ExpensesDatabase> | null = null;

const _create = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('removing database');
    await removeRxDatabase('expenses', 'idb');
  }
  console.log('DatabaseService: creating database..');
  const db: ExpensesDatabase = await createDb();
  console.log('DatabaseService: created database');
  // @ts-ignore
  window['db'] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    // todo: remove?
    console.log('isLeader now');
    document.title = '♛ ' + document.title;
  });

  // add collection
  await db.collection({
    name: 'expenses',
    schema: expenseSchema,
    methods: expansesCollectionMethods,
  });

  if (process.env.NODE_ENV !== 'production') {
    await _seedDb(db);
  }

  // // create collections
  return db;
};

export const getDB = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

export const _seedDb = async (db: ExpensesDatabase) => {
  const testDocs: ExpenseDocType[] = [];
  const currentDate = new Date();
  const categories = [
    'drinks',
    'clothes',
    'cigarettes',
    'clothes',
    'notSet',
    'groceries',
    'food',
  ];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < (i + 1) * 10; j++) {
      const timestamp = moment(currentDate)
        .subtract(i, 'M')
        .add(j, 'days')
        .format();

      testDocs.push({
        id: uuid(),
        amount: (i + 1) * 1000,
        createdAt: timestamp,
        updatedAt: timestamp,
        category: categories[j % 7],
        name: 'Expense ' + i + ' ' + j,
      });
    }
  }
  return await db.expenses.bulkInsert(testDocs);
};
