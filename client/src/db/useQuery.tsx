import { MangoQuery } from 'rxdb';
import * as DB from '../db/expanses-database';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = async (collection: string, query: MangoQuery | object) => {
  try {
    const db = await DB.getDB();
    if (!db) return [];
    const found = await db.expenses
      // @ts-ignore
      .find(query)
      .sort({ createdAt: 'asc' })
      .exec();
    return found.map((doc) => doc.toJSON());
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param param0
 */
export const useQuery = ({
  initQuery = {},
}: {
  initQuery: MangoQuery | object;
}) => {
  const [query, setQuery] = useState(initQuery);
  const { data, error } = useSWR(['expanses', query], (collection, query) =>
    fetcher(collection, query)
  );

  return {
    data,
    setQuery,
    loading: !data && !error,
    error,
  };
};
