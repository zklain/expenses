import React, { ReactNode } from 'react';
import Expense from './Expense';
import { ExpenseDocType } from '../../@types/expense';
import { Box, Flex, Text, Heading } from 'theme-ui';
import Date from './Date';
import { GiPiggyBank } from 'react-icons/gi';

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

const NoExpenses = () => (
  <Flex
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
    <Heading>Good for you!</Heading>
    <Text as='p'>You have no expenses this month.</Text>
    <Box sx={{ pt: 4 }}>
      <GiPiggyBank style={{ width: 60, height: 60 }} />
    </Box>
  </Flex>
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
