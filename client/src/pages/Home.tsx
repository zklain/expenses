import { useExpenses } from '../hooks/useExpanses/useExpenses.hook';
import React, { ReactNode, useContext } from 'react';
import { Heading } from 'theme-ui';
import Total from '../components/Expense/Total';
import AddExpanse from '../components/AddExpense/';
import ExpansesList from '../components/Expense/ExpensesList';
import MonthsSwitcher from '../components/Expense/TimeRangeControl';
import { DatabaseContext } from '../db/DatabaseContext';
import Loading from '../components/Loading';
import { Header, Layout } from '../components/layout';
import { PageContent } from '../components/layout/PageLayout';

export default () => {
  const {
    shown: expenses,
    currentMonthName,
    total,
    prevMonth,
    nextMonth,
    ofMonths,
    monthsBack,
    loading: queryLoading,
    year,
  } = useExpenses();

  const { loading: dbLoading } = useContext(DatabaseContext);

  return (
    <>
      <Header>
        <Heading variant='headerHeading'>Expenses</Heading>
        <Total
          currentMonthName={currentMonthName}
          total={total}
          shownYear={year}
        />
        <MonthsSwitcher
          ofMonths={ofMonths}
          monthsBack={monthsBack}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </Header>
      <PageContent>
        {dbLoading || queryLoading ? (
          <Loading />
        ) : (
          <ExpansesList expenses={expenses} />
        )}
      </PageContent>
      <AddExpanse />
    </>
  );
};
