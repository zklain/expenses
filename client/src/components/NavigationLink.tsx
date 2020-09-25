/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NavLink } from 'react-router-dom';

export default (props: any) => (
  <NavLink
    {...props}
    activeClassName='active'
    sx={{
      lineHeight: ['16px'],
      textDecoration: 'none',
      color: 'primary',
      '&.active': {},
    }}
    end
  />
);
