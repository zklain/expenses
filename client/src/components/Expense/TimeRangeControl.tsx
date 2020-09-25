import React from 'react';
import { Flex, Button, Box } from 'theme-ui';

export const TimeRangeButt = (props: any) => (
  <Button {...props} variant='monthSwitch' />
);

// @ts-ignore
export default ({ ofMonths, monthsBack, prevMonth, nextMonth }) => {
  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      {monthsBack < ofMonths ? (
        <TimeRangeButt onClick={() => prevMonth()}>{'<'}</TimeRangeButt>
      ) : (
        <Box />
      )}
      {monthsBack !== 0 && (
        <TimeRangeButt onClick={() => nextMonth()}>{'>'}</TimeRangeButt>
      )}
    </Flex>
  );
};

interface TimeRangeControlInput {
  ofUnits: number;
  back: number;
  setPrev: () => null;
  setNext: () => null;
}

export const TimeRangeControl = ({
  ofUnits,
  back,
  setPrev,
  setNext,
}: TimeRangeControlInput) => {
  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      {ofUnits < back ? (
        <TimeRangeButt onClick={setPrev}>{'<'}</TimeRangeButt>
      ) : (
        <Box />
      )}
      {back !== 0 && <TimeRangeButt onClick={setNext}>{'>'}</TimeRangeButt>}
    </Flex>
  );
};
