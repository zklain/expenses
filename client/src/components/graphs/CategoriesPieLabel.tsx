import React from 'react';
import { Group, Text } from '@visx/visx';
import { displayPrice } from '../../utils/prices';

export const CategoriesPieLabel = ({
  centerX,
  centerY,
  selectedCategory,
  margin,
}: any) => (
  <Group x={centerX} y={centerY}>
    <Text
      fontWeight={700}
      fontSize={18}
      fill='#000'
      height={30}
      textAnchor='middle'
      verticalAnchor='middle'
      x={centerX + margin.left}
      y={centerY}>
      {selectedCategory.id.substring(0, 1).toUpperCase() +
        selectedCategory.id.substring(1)}
    </Text>
    <Text
      textAnchor='middle'
      verticalAnchor='middle'
      fill='#000'
      x={centerX + margin.left}
      y={centerY + 25}
      style={{ fontStyle: 'italic' }}>
      {`€ ${displayPrice(selectedCategory.sum)}`}
    </Text>
    {selectedCategory.percentage && (
      <Text
        fill='#000'
        height={20}
        textAnchor='middle'
        verticalAnchor='middle'
        x={centerX + margin.left}
        y={centerY + 20 + 25}>
        {`${selectedCategory.percentage}%`}
      </Text>
    )}
  </Group>
);
