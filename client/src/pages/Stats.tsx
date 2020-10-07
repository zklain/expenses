import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Box, Heading, Text } from 'theme-ui';
import { DatabaseContext } from '../db/DatabaseContext';
import {
  countMonthsAvg,
  countTotal,
  buildDateRangeQry,
  countForCategory,
} from '../utils/query-utils';
import MonthsBar from '../components/graphs/MonthsBar';
import Pie from '../components/graphs/AnimatedPie';
import moment from 'moment';
import { useQuery } from '../db/useQuery';
import MonthsSwitcher, {
  TimeRangeButt,
} from '../components/Expense/TimeRangeControl';
import { PageContent, Header, Card } from '../components/layout';
import Loading from '../components/Loading';
import { ExpanseCategoryCount, MonthsAvg } from '../@types/expense';
import NoExpenses from '../components/Expense/NoExpenses';

// todo: needed?

const query = buildDateRangeQry({
  from: moment().subtract(0, 'year').startOf('year').format(),
  to: moment().subtract(0, 'year').endOf('year').format(),
});

export default () => {
  const { loading: queryLoading, data, error, setQuery } = useQuery({
    initQuery: query,
  });
  const { loading: dbLoading, ofMonths } = useContext(DatabaseContext);
  const [year, setYear] = useState(0);

  // todo: redux
  // todo: use separate collection for aggregations
  const categories = useMemo(() => countForCategory(data), [data]);
  const total = useMemo(() => countTotal(data), [data]);
  const months = useMemo(() => countMonthsAvg(data), [data]);

  const loading = !data || !categories || !months;

  const moveYear = (years = 0) => {
    // todo: use current year as start
    // todo: check if next year available
    const query = buildDateRangeQry({
      from: moment().subtract(years, 'year').startOf('year').format(),
      to: moment().subtract(years, 'year').endOf('year').format(),
    });

    console.log(query);
    setQuery(query);
  };

  return (
    <>
      <Header>
        <Heading variant='headerHeading'>Stats</Heading>
        {/* <Box>
          <MonthSwitchButt onClick={() => moveYear(1)}>{'<'}</MonthSwitchButt>
          <MonthSwitchButt onClick={() => moveYear(-1)}>{'>'}</MonthSwitchButt>
        </Box> */}
      </Header>

      <PageContent>
        {dbLoading || loading ? (
          <Loading />
        ) : (
          <Charts categories={categories} months={months} total={total} />
        )}
      </PageContent>
    </>
  );
};

const Charts = ({
  categories,
  months,
  total,
}: {
  categories: ExpanseCategoryCount[];
  months: MonthsAvg;
  total: number;
}) =>
  categories.length ? (
    <>
      <Card my={4}>
        <Heading mb={[3]}>Categories</Heading>
        <Pie data={categories} total={total} />
      </Card>
      <Card my={4}>
        <Heading mb={[4]}>Months</Heading>
        <MonthsBar
          // @ts-ignore
          data={months}
        />
      </Card>
    </>
  ) : (
    <NoExpenses />
  );
