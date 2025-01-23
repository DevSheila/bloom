import ErrorBox from '@/elements/Reusable/ErrorBox';
import Layout from '@/elements/Reusable/Layout';
import React from 'react';
import AirConditionsItem from './AirConditionsItem';

const TodayWeatherAirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === '404';

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
      </>
    );
  return (
    <Layout
      title="Air Conditions"
      content={content}
      sx={{ marginTop: '1rem' }} 
    />
  );
};

export default TodayWeatherAirConditions;
