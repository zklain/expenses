import React from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box, Flex, Heading } from 'theme-ui';
import Date from './Date';

export default ({ expenses }: { expenses: Array<ExpenseDocType[]> }) =>
  // list wrap

  expenses.length > 0 ? (
    <Box
      sx={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        overflowY: 'scroll',
        pb: ['150px'],
      }}>
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
    </Box>
  ) : (
    <Heading>No expanses. Good for you!</Heading>
  );
