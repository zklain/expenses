import React from 'react';
import { Box } from 'theme-ui';

export const categoriesList = [
  'drinks',
  'food',
  'cigarettes',
  'groceries',
  'clothes',
  'notSet',
];

export const categoryIconsMap = {
  drinks: '🍸',
  food: '🍔',
  cigarettes: '🚬',
  groceries: '🛒',
  clothes: '👗',
  notSet: '🤑',
};

export const CategoryIcon = ({ category = '' }: { category: string }) => {
  // @ts-ignore
  return <Box>{categoryIconsMap[category]}</Box>;
};
