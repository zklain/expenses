import React from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box, Heading } from 'theme-ui';
import Date from './Date';

export default ({ expenses }: { expenses: Array<ExpenseDocType[]> }) => {
  if (!expenses.length) {
    return <Heading>No expanses. Good for you!</Heading>;
  }

  return (
    <>
      {expenses.map((forDay: ExpenseDocType[], index: number) => (
        <Box
          key={forDay[0].createdAt}
          sx={{ mt: [3], '&:nth-of-type(1)': { mt: [0] } }}>
          <Date timeString={forDay[0].createdAt} />
          {forDay.map((exp) => (
            <Expense key={exp.id} {...exp} />
          ))}
        </Box>
      ))}
    </>
  );
};
