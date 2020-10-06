import React from 'react';
import { Flex, Spinner } from 'theme-ui';

export default () => (
  <Flex
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
    <Spinner />
  </Flex>
);
