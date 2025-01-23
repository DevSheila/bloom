import React from 'react';
import { Typography } from '@mui/material';
import { getUTCDatetime } from '@/utilities/DatetimeUtils';


const UTCDatetime = () => {
  const utcFullDate = getUTCDatetime();
  const utcTimeValue = (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: '400',
        fontSize: { xs: '10px', sm: '12px' },
        color: 'rgb(0,0,0)',
        lineHeight: 1,
        paddingRight: '2px',
      }}
    >
      {utcFullDate} GMT
    </Typography>
  );
  return utcTimeValue;
};

export default UTCDatetime;
