import { Box, Typography } from '@mui/material';
import React from 'react';

const TemperatureWeatherDetail = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '500',
          fontSize: { xs: '30px', sm: '30px', md: '40px' },
          color: 'black',
          
        }}
      >
        {Math.round(props.temperature)} °C
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '10px', sm: '12px', md: '14px' },
          color: 'rgb(0,0,0)',
          lineHeight: 1,
          textAlign: 'center',
        }}
      >
        {props.description} 
      </Typography>
    </Box>
  );
};

export default TemperatureWeatherDetail;
