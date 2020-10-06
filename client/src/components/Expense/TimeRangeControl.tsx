import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Flex, Box, IconButton } from 'theme-ui';

export const TimeRangeButt = ({
  variant,
  onClick,
}: {
  variant: 'left' | 'right';
  onClick: any;
}) => (
  <IconButton onClick={onClick}>
    {variant === 'left' ? (
      <FiChevronLeft style={{ height: 24, width: 24 }} />
    ) : (
      <FiChevronRight style={{ height: 24, width: 24 }} />
    )}
  </IconButton>
);

// @ts-ignore
export default ({ ofMonths, monthsBack, prevMonth, nextMonth }) => {
  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      {monthsBack < ofMonths ? (
        <TimeRangeButt variant='left' onClick={() => prevMonth()} />
      ) : (
        <Box />
      )}
      {monthsBack !== 0 && (
        <TimeRangeButt variant='right' onClick={() => nextMonth()} />
      )}
    </Flex>
  );
};

// interface TimeRangeControlInput {
//   ofUnits: number;
//   back: number;
//   setPrev: () => null;
//   setNext: () => null;
// }

// export const TimeRangeControl = ({
//   ofUnits,
//   back,
//   setPrev,
//   setNext,
// }: TimeRangeControlInput) => {
//   return (
//     <Flex sx={{ justifyContent: 'space-between' }}>
//       {ofUnits < back ? (
//         <TimeRangeButt onClick={setPrev}>{'<'}</TimeRangeButt>
//       ) : (
//         <Box />
//       )}
//       {back !== 0 && <TimeRangeButt onClick={setNext}>{'>'}</TimeRangeButt>}
//     </Flex>
//   );
// };
