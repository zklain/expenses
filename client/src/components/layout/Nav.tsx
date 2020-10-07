import React from 'react';
import { Flex, Box, IconButton } from 'theme-ui';
import NavigationLink from '../NavigationLink';
import { FiPieChart, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { BsFillBarChartFill } from 'react-icons/bs';
import { GiPayMoney } from 'react-icons/gi';
import { useAddExpenseForm } from '../AddExpense/AddExpenseContext';

export default () => {
  const { setFormOpen, formOpen } = useAddExpenseForm();

  return (
    <nav>
      <Flex variant='navbar' sx={{}}>
        <Box variant='navLinkHolder'>
          <NavigationLink to='/'>
            <IconButton>
              <GiPayMoney style={{ height: '20px', width: '20px' }} />
            </IconButton>
          </NavigationLink>
        </Box>

        <Box variant='navLinkHolder'>
          <NavigationLink to='/stats'>
            <IconButton>
              <BsFillBarChartFill style={{ height: '20px', width: '20px' }} />
            </IconButton>
          </NavigationLink>
        </Box>

        {/* <Box variant='navLinkHolder'>
          <IconButton
            sx={{ color: formOpen ? 'purple' : 'text' }}
            onClick={() => setFormOpen(true)}>
            <FiPlusCircle style={{ height: '20px', width: '20px' }} />
          </IconButton>
        </Box> */}

        <Box variant='navLinkHolder'>
          <NavigationLink to='/profile'>
            <IconButton>
              <FiSettings style={{ height: '20px', width: '20px' }} />
            </IconButton>
          </NavigationLink>
        </Box>
      </Flex>
    </nav>
  );
};
