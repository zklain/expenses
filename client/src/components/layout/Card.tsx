import React from 'react';
import { Box } from 'theme-ui';

// @ts-ignore
export default ({ children, ...props }) => (
  <Box variant='card' {...props}>
    {children}
  </Box>
);
