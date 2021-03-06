import moment from 'moment';
import { Box } from 'theme-ui';
import React from 'react';

// TODO: today, yesterday => Test
export default ({ timeString }: { timeString: string }) => (
  <Box sx={{ color: 'grey', fontSize: [1], fontWeight: 500, ml: [3] }}>
    {moment(timeString).format('MMM Do')}
  </Box>
);
