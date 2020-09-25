import React from 'react';
import { Flex, Box } from 'theme-ui';
import NavigationLink from '../NavigationLink';

export default () => {
  return (
    <nav>
      <Flex variant='navbar' sx={{}}>
        <Box variant='navLinkHolder'>
          <NavigationLink to='/'>
            <span role='img' aria-label='Home Link Icon'>
              🏠
            </span>
            <p>Home</p>
          </NavigationLink>
        </Box>

        <Box variant='navLinkHolder'>
          <NavigationLink to='/stats'>
            <span role='img' aria-label='Stats link icon'>
              📈
            </span>
            <p>Stats</p>
          </NavigationLink>
        </Box>

        <Box variant='navLinkHolder'>
          <NavigationLink to='/profile'>
            <span role='img' aria-label='Profide link icon'>
              👱‍♀️
            </span>
            <p>Profile</p>
          </NavigationLink>
        </Box>
      </Flex>
    </nav>
  );
};
