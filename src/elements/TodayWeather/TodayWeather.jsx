import { Grid } from '@mui/material';
import React from 'react';
import DailyForecast from './Forecast/DailyForecast';
import Details from './Details/Details';
import AirConditions from './AirConditions/AirConditions';

const TodayWeather = ({ data, forecastList }) => {
  return (
    <Grid >
    {/* <Grid container sx={{ padding: '3rem 0rem 0rem' }}> */}
      <Details data={data} />
      <AirConditions data={data} />
      {/* <DailyForecast data={data} forecastList={forecastList} /> */}
    </Grid>
  );
}; 

export default TodayWeather;
