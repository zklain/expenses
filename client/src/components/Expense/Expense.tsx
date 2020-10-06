import React, { useContext } from 'react';
import { ExpenseDocType } from '../../@types/expense';
import { CategoryIcon } from './CategoryIcon';
import Date from './Date';
import { DatabaseContext } from '../../db/DatabaseContext';
import { Flex, Text, Button, IconButton } from 'theme-ui';
import { displayPrice } from '../../utils/prices';
import { GrClose } from 'react-icons/gr';

export default ({ id, amount, name, createdAt, category }: ExpenseDocType) => {
  const { removeExpanse } = useContext(DatabaseContext);

  return (
    <>
      <Flex
        sx={{
          // py,
          px: [3],
          py: [3],
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.5rem',
          // '&:nth-of-type(n + 1)': {
          //   margin
          // },
        }}>
        {/* <h4>{name}</h4> */}
        <CategoryIcon category={category ? category : 'notSet'} />
        <Text>{name}</Text>
        <Text>€ {displayPrice(amount)}</Text>
        {/* <Button variant='remove' onClick={() => removeExpanse(id)}>
          X
        </Button> */}
        {/* <IconButton variant='close' onClick={() => removeExpanse(id)}>
          <GrClose />
        </IconButton> */}
      </Flex>
    </>
  );
};
