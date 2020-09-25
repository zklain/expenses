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
          padding: '0.75rem 1rem',
          boxShadow: '0px 0px 3px #d8d8d8',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          borderRadius: '0.5rem',
          mx: 1,
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
