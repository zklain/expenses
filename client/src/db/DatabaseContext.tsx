import React, { useState, useEffect } from 'react';
import * as DB from './expanses-database';
import { RxDatabase } from 'rxdb/dist/types/types/rx-database';
import { ExpenseDatabaseCollection } from '../@types/expense';
import { countMonthsDiff } from '../utils/query-utils';
import { v4 as uuid } from 'uuid';

export interface IDatabaseContext {
  db: RxDatabase<ExpenseDatabaseCollection> | undefined;
  loading: boolean;
  ofMonths: number;
  removeExpanse: any;
  addExpanse: any;
  clearExpanses: any;
  seedDb: any;
}

export const DatabaseContext = React.createContext<IDatabaseContext>({
  db: undefined,
  loading: false,
  ofMonths: 0,
  removeExpanse: null,
  addExpanse: null,
  clearExpanses: null,
  seedDb: null,
});

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [db, setDb] = useState<RxDatabase<ExpenseDatabaseCollection>>();
  const [loading, setLoading] = useState(true);
  const [ofMonths, setOfMonths] = useState(0);
  const [error, setError] = useState(null);
  const [updatesSubs, setUpdatesSub] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const expensesDb = await DB.getDB();
        setDb(expensesDb);
        setLoading(false);
        const first = await expensesDb.expenses
          .find()
          .limit(1)
          .sort({ createdAt: 'asc' })
          .exec();

        const last = await expensesDb.expenses
          .find()
          .limit(1)
          .sort({ createdAt: 'desc' })
          .exec();

        if (first && last) {
          const start = first[0].toJSON().createdAt;
          const end = last[0].toJSON().createdAt;
          setOfMonths(countMonthsDiff(start, end));
        } else {
          setOfMonths(0);
        }

        // todo: pass state change handling function to the subscribe
        // const sub = expensesDb.expenses.$.subscribe((changeEvent) =>
        //   console.log(changeEvent)
        // );

        // @ts-ignore

        return () => sub.unsubsribe();
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  const removeExpanse = async (id: string) => {
    if (!db) return;
    const res = await db.expenses.find().where({ id }).remove();
    return res;
  };

  const addExpanse = async ({
    amount,
    category,
    name,
  }: {
    amount: number;
    category: string;
    name?: string;
  }) => {
    if (!db) return;
    const timestamp = new Date().toISOString();
    return await db.expenses.insert({
      id: uuid(),
      amount: amount * 100,
      category,
      name,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  const clearExpanses = async () => {
    if (!db) return;
    setLoading(true);
    await db.expenses.find().where({}).remove();
    setOfMonths(0);
    setLoading(false);
  };

  const seedDb = async () => {
    if (!db) return;
    setLoading(true);
    await DB._seedDb(db);
    setLoading(false);
  };

  return (
    <DatabaseContext.Provider
      value={{
        db,
        loading,
        ofMonths,
        removeExpanse,
        clearExpanses,
        addExpanse,
        seedDb,
      }}>
      {children}
    </DatabaseContext.Provider>
  );
};
