import React from 'react';
import { Box } from 'theme-ui';

// @ts-ignore
export default ({ children, ...props }) => (
  <Box variant='container' {...props}>
    {children}
  </Box>
);

// TODO: type
