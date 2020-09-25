import React from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box, Flex, Heading } from 'theme-ui';
import Date from './Date';

export default ({
  expenses,
  queryLoading,
}: {
  expenses: Array<ExpenseDocType[]>;
  queryLoading: boolean;
}) => (
  <Box>
    {queryLoading ? (
      <Heading>Loading expenses...</Heading>
    ) : expenses.length > 0 ? (
      <Flex sx={{ maxHeight: '500px', flexDirection: 'column' }}>
        <ul style={{ overflowY: 'auto', flexGrow: 1 }}>
          {expenses.map((forDay: ExpenseDocType[], index: number) => (
            <li key={index}>
              <Date timeString={forDay[0].createdAt} />
              {forDay.map((exp) => (
                <Expense key={exp.id} {...exp} />
              ))}
            </li>
          ))}
        </ul>
      </Flex>
    ) : (
      <Heading>No expanses. Good for you!</Heading>
    )}
  </Box>
);
