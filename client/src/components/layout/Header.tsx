import React from 'react';
import { Box } from 'theme-ui';

export default ({ children = null }: { children: any }) => (
  <header>
    <Box variant='header'>{children}</Box>
  </header>
);
