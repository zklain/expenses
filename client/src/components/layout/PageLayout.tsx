import React, { ReactNode, useContext } from 'react';
import { Box, Flex } from 'theme-ui';
import { AddExpenseContext } from '../AddExpense/AddExpenseContext';

export const Layout = ({ children }: { children: ReactNode }) => (
  <Flex
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      // px: [4],
      pb: ['3.5rem'],
    }}>
    {children}
  </Flex>
);

export const PageContent = ({ children }: { children: ReactNode }) => {
  const { formOpen } = useContext(AddExpenseContext);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      <Box
        className={formOpen ? 'no-scroll' : ''}
        sx={{
          height: '100%',
          position: 'absolute',
          width: '100%',
          px: [3],
          overflowY: 'scroll',
          '&:-webkit-scrollbar ': {
            backgroundColor: 'transparent',
          },
        }}>
        {children}
      </Box>
    </Box>
  );
};
