import React from 'react';
import { Box } from 'theme-ui';

export default ({ children = null }: { children: any }) => (
  <header>
    <Box
      sx={{
        py: [3, 4],
        px: [3],
      }}>
      {children}
    </Box>
  </header>
);
