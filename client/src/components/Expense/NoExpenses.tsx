import React from 'react';
import { GiPiggyBank } from 'react-icons/gi';
import { Box, Flex, Heading, Text } from 'theme-ui';

export default () => (
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
