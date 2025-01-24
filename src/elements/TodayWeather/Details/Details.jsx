import React from "react";
import { Grid } from "@mui/material";
import { getDayMonthFromDate } from "@/utilities/DatetimeUtils";
import { weatherIcon } from "@/utilities/IconsUtils";
import ErrorBox from "@/elements/Reusable/ErrorBox";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";
import WeatherIconDetail from "./WeatherIconDetail";
import Layout from "@/elements/Reusable/Layout";

const dayMonth = getDayMonthFromDate();

const Details = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>

        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <TemperatureWeatherDetail
            temperature={data.main.temp}
            description={data.weather[0].description}
          />
        </Grid> 
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
          }}
        >
          <WeatherIconDetail src={weatherIcon(`${data.weather[0].icon}.png`)} />
        </Grid>
        <Grid
          item
          xs={4} 
          sx={{
            height: "80px",
          }}
        >
          <CityDateDetail city={data.city} name={data.name} country={data.sys.country} date={dayMonth} />
        </Grid>
      </>
    );

  return <Layout  content={content} />;
};

export default Details;
