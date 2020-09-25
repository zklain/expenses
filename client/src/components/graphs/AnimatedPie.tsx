import React, { useState } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import { ParentSize, Group, scaleOrdinal } from '@visx/visx';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { ExpanseCategoryCount } from '../../@types/expense';
import { animated, useTransition, interpolate } from 'react-spring';
import {
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPurpleRed,
  GradientTealBlue,
  LinearGradient,
} from '@visx/gradient';
import { CategoriesPieLabel } from './CategoriesPieLabel';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export type PieProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  total: number;
  data: ExpanseCategoryCount[];
  animate?: boolean;
};

const JuicyPie = ({
  width,
  height,
  data,
  margin = defaultMargin,
  total,
  animate = true,
}: PieProps) => {
  const { theme } = useThemeUI();
  const initState: ExpanseCategoryCount = {
    id: `${data.length} Categories`,
    sum: total,
    percentage: 0,
  };
  const [selectedCategory, setSelectedCat] = useState<ExpanseCategoryCount>(
    initState
  );

  const selectCategory = (label: string) => {
    if (selectedCategory.id === label) {
      return resetSelectedCat();
    }

    const found = data.find((c) => c.id === label);
    if (found) {
      setSelectedCat({
        sum: found.sum,
        percentage: found.percentage,
        id: label,
      });
    }
  };

  const resetSelectedCat = () => {
    setSelectedCat({ ...initState });
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  if (width < 10) return null;

  const formatedData = data.map((c) => {
    return { label: c.id, sum: c.sum };
  });

  const CATEGORY_GRADIENTS = {
    drinks: ['#gLightGreen', '#15eca5'],
    food: ['#gPink', '#ec15c8'],
    cigarettes: ['#gOrangeRed', '#ffb121'],
    groceries: ['#gPurple', '#a515ec'],
    clothes: ['#gBlue', '#22ecff'],
    notSet: ['#gRed', '#cf3266'],
  };

  const colors = scaleOrdinal({
    domain: data.map((c) => c.id),
    range: Object.values(CATEGORY_GRADIENTS).map((c) => `url(${c[0]})`),
  });

  const colorsSelected = scaleOrdinal({
    domain: data.map((c) => c.id),
    range: Object.values(CATEGORY_GRADIENTS).map((c) => c[1]),
  });

  const getColor = (label: string) => {
    return label === selectedCategory.id
      ? colorsSelected(label)
      : colors(label);
  };

  return (
    <svg width={width} height={height}>
      <GradientLightgreenGreen id='gLightGreen' rotate='-90' />
      <GradientOrangeRed id='gOrangeRed' />
      <GradientTealBlue id='gBlue' />
      <GradientPinkBlue id='gPink' rotate='-45' />
      <LinearGradient id='gPurple' from='#4f3681' to='#a515ec' rotate='-90' />
      <GradientPurpleRed id='gRed' rotate='-90' r='' />
      {/* <RadialGradient id='gDarkBlue' from='#22ecff' to='#351CAB' r='-90' /> */}
      <rect
        rx={14}
        width={width}
        height={height}
        fill={
          //@ts-ignore
          theme.colors.background
        }
      />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={formatedData.map((c) => c)}
          pieValue={(c) => c.sum}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}>
          {(pie) => (
            <AnimatedPie
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data.label}
              onClickDatum={({ data: { label } }) => selectCategory(label)}
              getColor={(arc) => getColor(arc.data.label)}
            />
          )}
        </Pie>
      </Group>
      <CategoriesPieLabel {...{ centerX, centerY, margin, selectedCategory }} />
    </svg>
  );
};

export default ({
  data,
  total,
}: {
  data: ExpanseCategoryCount[];
  total: number;
}) => (
  <Box sx={{ height: 300 }}>
    <ParentSize>
      {({ height, width }) => <JuicyPie {...{ width, height, data, total }} />}
    </ParentSize>
  </Box>
);

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  delay?: number;
};

export function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
    arcs,
    getKey,
    // @ts-ignore react-spring doesn't like this overload
    {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition,
    }
  );

  return (
    <>
      {transitions.map(
        ({
          item: arc,
          props,
          key,
        }: {
          item: PieArcDatum<Datum>;
          props: AnimatedStyles;
          key: string;
        }) => {
          return (
            <g key={key}>
              <animated.path
                // compute interpolated path d attribute from intermediate angle values
                d={interpolate(
                  [props.startAngle, props.endAngle],
                  (startAngle, endAngle) =>
                    path({
                      ...arc,
                      startAngle,
                      endAngle,
                    })
                )}
                fill={getColor(arc)}
                onClick={() => onClickDatum(arc)}
              />
            </g>
          );
        }
      )}
    </>
  );
}
