import React, { ReactNode } from 'react';
import { Box, Flex } from 'theme-ui';

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

export const PageContent = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}>
    <Box
      sx={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        px: [4],
        overflowY: 'scroll',
        pb: ['150px'],
        '&:-webkit-scrollbar ': {
          backgroundColor: 'transparent',
        },
      }}>
      {children}
    </Box>
  </Box>
);
