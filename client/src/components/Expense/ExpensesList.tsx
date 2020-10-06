import React, { ReactNode } from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box, Heading } from 'theme-ui';
import Date from './Date';

const ExpanseDayHolder = ({ children }: { children: ReactNode }) => (
  <Box sx={{ mt: [4], '&:nth-of-type(1)': { mt: [0] } }}>{children}</Box>
);

const DayExpensesList = ({ expenses }: { expenses: ExpenseDocType[] }) => (
  <Box
    sx={{
      borderRadius: '12px',
      backgroundColor: 'white',
      // px: [3],
      // py: [3],
      mt: [2],
    }}>
    {expenses.map((exp) => (
      <Expense key={exp.id} {...exp} />
    ))}
  </Box>
);

export default ({ expenses }: { expenses: Array<ExpenseDocType[]> }) => {
  if (!expenses.length) {
    return <Heading>No expanses. Good for you!</Heading>;
  }

  return (
    <>
      {expenses.map((forDay: ExpenseDocType[], index: number) => (
        <ExpanseDayHolder key={forDay[0].createdAt}>
          <Date timeString={forDay[0].createdAt} />
          <DayExpensesList expenses={forDay} />
        </ExpanseDayHolder>
      ))}
    </>
  );
};
