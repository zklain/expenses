import React, { useContext } from 'react';
import { ExpenseDocType } from '../../@types/expense';
import { CategoryIcon } from './CategoryIcon';
import Date from './Date';
import { DatabaseContext } from '../../db/DatabaseContext';
import { Flex, Text, Button } from 'theme-ui';
import { displayPrice } from '../../utils/prices';

export default ({ id, amount, name, createdAt, category }: ExpenseDocType) => {
  const { removeExpanse } = useContext(DatabaseContext);

  return (
    <>
      <Flex
        sx={{
          // py,
          px: [2],
          py: [2],
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.5rem',
        }}>
        {/* <h4>{name}</h4> */}
        <CategoryIcon category={category ? category : 'notSet'} />
        <Text>{name}</Text>
        <Text>€ {displayPrice(amount)}</Text>
        <Button variant='remove' onClick={() => removeExpanse(id)}>
          X
        </Button>
      </Flex>
    </>
  );
};
