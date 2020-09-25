import React from 'react';
import { Heading, Flex } from 'theme-ui';
import { displayPrice } from '../../utils/prices';

export default ({
  currentMonthName,
  total,
  shownYear,
}: {
  currentMonthName: string;
  total: number;
  shownYear: string | undefined;
}) => {
  return (
    <Flex
      py={[2]}
      sx={{
        justifyContent: 'space-between',
      }}>
      <Heading variant='h2'>
        {currentMonthName} {shownYear ? `'${shownYear}` : ''}
      </Heading>
      <Heading>€ {displayPrice(total)}</Heading>
    </Flex>
  );
};
