import React, { useMemo } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import {
  Bar,
  AxisBottom,
  Group,
  ParentSize,
  scaleBand,
  scaleLinear,
  AxisLeft,
  Line,
  Text,
  LinearGradient,
} from '@visx/visx';
import { MonthsAvg } from '../../@types/expense';

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: MonthsAvg;
};

const defaultMargin = { top: 40, right: 0, bottom: 80, left: 10 };

const BarStack = ({
  height,
  width,
  margin = defaultMargin,
  data,
}: BarStackProps) => {
  const { theme } = useThemeUI();

  // bounds
  const xMax = width;
  const yMax = height - margin.bottom;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        // round: true,
        domain: [...data.months.map((m) => m.name)],
        padding: 0.5,
      }),
    [xMax, data.months]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        // round: true,
        domain: [0, Math.max(...data.months.map((m) => m.total))],
      }),
    [yMax, data.months]
  );

  const dateScale = useMemo(
    () =>
      scaleBand<string>({
        domain: [...data.months.map((m) => m.name.substring(0, 3))],
        padding: 0.5,
        range: [0, xMax],
      }),
    [xMax, data.months]
  );

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        <LinearGradient
          // @ts-ignore
          from={theme.colors.purple}
          // @ts-ignore
          to={theme.colors.darkBlue}
          id='gradBlue'
        />
        <rect
          width={width}
          height={height}
          rx={14}
          x={0}
          y={0}
          // @ts-ignore
          fill={theme.colors.backgroundLight}
        />
        <Group top={margin.top} x={margin.left}>
          {data.months.map((month) => {
            // const monthName = month.name;
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - yScale(month.total);
            // @ts-ignore
            const barX = xScale(month.name) + margin.left;
            const barY = yMax - barHeight;
            return (
              <Bar
                key={month.name}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill='url(#gradBlue)'
              />
            );
          })}
        </Group>
        <Group>
          <Text
            x={0}
            y={yScale(data.avg)}
            width={40}
            fontSize={10}
            textAnchor='start'
            verticalAnchor='middle'
            fill='blue'>
            {`€${data.avg}`}
          </Text>
          <Line
            from={{ x: margin.left + 40, y: yScale(data.avg) }}
            to={{ x: width - margin.right, y: yScale(data.avg) }}
            stroke='blue'
            strokeWidth={1}
            pointerEvents='none'
            strokeDasharray='5,2'
          />
        </Group>
        <AxisBottom
          hideAxisLine={true}
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          // stroke='purple'
          hideTicks={true}
          // @ts-ignore
          tickLabelProps={() => ({
            // @ts-ignore
            fill: theme.colors.grey,
            fontSize: 12,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          hideAxisLine={true}
          hideTicks={true}
          hideZero={true}
          tickValues={[0, Math.max(...data.months.map((m) => m.total))]}
          // labelOffset={100}
          // @ts-ignore
          tickLabelProps={() => ({
            dx: '0.5rem',
            fontSize: 12,
            // @ts-ignore
            fill: theme.colors.grey,
          })}
          scale={yScale}
          top={margin.top}
          left={0}
        />
      </svg>
    </div>
  );
};

export default ({ data }: { data: MonthsAvg }) => {
  return (
    <Box sx={{ height: 400 }}>
      <ParentSize>
        {({ height, width }) =>
          height > 80 && <BarStack {...{ height, width, data }} />
        }
      </ParentSize>
    </Box>
  );
};

// TODO: single month => add artificial months, empty bars
// TODO: scroll (Brush) / Change months (display last 6 months)
// TODO: color
// TODO: LeftAXIS Labels (1.4k format)
// TODO: gradient
// TODO: onHover / onClick => show Tooltip
