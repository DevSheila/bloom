import { Typography } from '@mui/material';
import React from 'react';

const SectionHeader = ({ title, mb }) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: { xs: '12px', sm: '16px', md: '18px' },
        color: 'rgb(0,0,0)',
        fontWeight: '400',
        lineHeight: 1,
        textAlign: 'center',
        marginBottom: mb ? mb : '1rem',
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;
