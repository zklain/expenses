import React, { ReactNode } from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box } from 'theme-ui';
import Date from './Date';
import NoExpenses from './NoExpenses';

const ExpanseDayHolder = ({ children }: { children: ReactNode }) => (
  <Box sx={{ mt: [4], '&:nth-of-type(1)': { mt: [0] } }}>{children}</Box>
);

const DayExpensesList = ({ expenses }: { expenses: ExpenseDocType[] }) => (
  <Box
    sx={{
      borderRadius: '12px',
      backgroundColor: 'white',
      mt: [2],
    }}>
    {expenses.map((exp) => (
      <Expense key={exp.id} {...exp} />
    ))}
  </Box>
);

export default ({ expenses }: { expenses: Array<ExpenseDocType[]> }) => {
  if (!expenses.length) {
    return <NoExpenses />;
  }

  return (
    <>
      <Box sx={{ height: 'fit-content', marginBottom: '100px' }}>
        {expenses.map((forDay: ExpenseDocType[], index: number) => (
          <ExpanseDayHolder key={forDay[0].createdAt}>
            <Date timeString={forDay[0].createdAt} />
            <DayExpensesList expenses={forDay} />
          </ExpanseDayHolder>
        ))}
      </Box>
    </>
  );
};
