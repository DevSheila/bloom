import { Grid } from "@mui/material";
import React from "react";
import DailyForecast from "./Forecast/DailyForecast";
import Details from "./Details/Details";
import AirConditions from "./AirConditions/AirConditions";
import { Separator } from "@/components/ui/separator";

const TodayWeather = ({ data, forecastList }) => {
  return (
    <Grid>
      {/* <Grid container sx={{ padding: '3rem 0rem 0rem' }}> */}
      <Details data={data} />
      <Separator  className="my-4 text-black"/> 
      <AirConditions data={data} />
      {/* <DailyForecast data={data} forecastList={forecastList} /> */}
    </Grid>
  );
};

export default TodayWeather;
