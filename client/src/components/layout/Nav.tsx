import React from 'react';
import { Flex, Box, IconButton } from 'theme-ui';
import NavigationLink from '../NavigationLink';
import { FiPieChart, FiSettings } from 'react-icons/fi';
import { GiPayMoney } from 'react-icons/gi';

export default () => {
  return (
    <nav>
      <Flex variant='navbar' sx={{}}>
        <Box variant='navLinkHolder'>
          <NavigationLink to='/'>
            {/* <span role='img' aria-label='Home Link Icon'>
              🏠
            </span>
            <p>Home</p> */}

            <IconButton>
              <GiPayMoney
                style={{ height: '20px', width: '20px' }}
                height={16}
                width={16}
              />
            </IconButton>
          </NavigationLink>
        </Box>

        <Box variant='navLinkHolder'>
          <NavigationLink to='/stats'>
            {/* <span role='img' aria-label='Stats link icon'>
              📈
            </span>
            <p>Stats</p> */}
            <IconButton>
              <FiPieChart
                style={{ height: '20px', width: '20px' }}
                height={16}
                width={16}
              />
            </IconButton>
          </NavigationLink>
        </Box>

        <Box>{/* // todo: add expense */}</Box>

        <Box variant='navLinkHolder'>
          <NavigationLink to='/profile'>
            <IconButton>
              <FiSettings style={{ height: '20px', width: '20px' }} />
            </IconButton>
            {/* <span role='img' aria-label='Profile link icon'>
              👱‍♀️
            </span>
            <p>Profile</p> */}
          </NavigationLink>
        </Box>
      </Flex>
    </nav>
  );
};
