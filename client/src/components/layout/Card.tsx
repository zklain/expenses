import React from 'react';
import { Box } from 'theme-ui';

// @ts-ignore
export default ({ children, ...props }) => (
  <Box
    sx={{
      backgroundColor: 'white',
      // boxShadow: '0px 1px 3px grey',
      borderRadius: '20px',
      p: [3],
    }}
    {...props}>
    {children}
  </Box>
);
