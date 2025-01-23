import { weatherIcon } from '@/utilities/IconsUtils';
import { Box, Typography } from '@mui/material';
import React from 'react';

const DailyForecastItem = (props) => {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        textAlign: 'center',
        padding: '4px 0',
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '400',
          fontSize: { xs: '10px', sm: '12px' },
          color: 'rgb(0, 0, 0)',
          lineHeight: 1,
          padding: '4px',
        }}
      >
        {props.item.time}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          padding: '4px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '36px', sm: '42px' },
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            margin: '0 auto',
          }}
          alt="weather"
          src={weatherIcon(`${props.data.weather[0].icon}.png`)}
        />
      </Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '400',
          fontSize: { xs: '12px', sm: '14px' },
          color: 'black',
          
          lineHeight: 1,
          marginBottom: { xs: '8px', md: '0' },
        }}
      >
        {props.item.temperature}
      </Typography>
    </Box>
  );
};

export default DailyForecastItem;
