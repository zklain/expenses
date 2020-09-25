import { useExpenses } from '../db/useExpenses';
import React, { useContext } from 'react';
import { Box, Heading } from 'theme-ui';
import Total from '../components/Expense/Total';
import AddExpanseForm from '../components/Expense/AddExpenseForm';
import ExpansesList from '../components/Expense/ExpensesList';
import MonthsSwitcher from '../components/Expense/TimeRangeControl';
import Header from '../components/layout/Header';
import { DatabaseContext } from '../db/DatabaseContext';

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
        <Box py={2}>
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
        </Box>
      </Header>
      <main>
        <Box pb={6} pt={2} px={4} mt='10rem'>
          {dbLoading ? (
            <Heading>DB Loading...</Heading>
          ) : (
            <>
              <ExpansesList expenses={expenses} queryLoading={queryLoading} />
            </>
          )}
        </Box>
        <AddExpanseForm />
      </main>
    </>
  );
};
