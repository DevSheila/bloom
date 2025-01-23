import React, { useState } from "react";
import { fetchWeatherData } from "@/api/OpenWeatherService";
import LoadingBox from "@/elements/Reusable/LoadingBox";
import UTCDatetime from "@/elements/Reusable/UTCDatetime";
import Search from "@/elements/Search/Search";
import TodayWeather from "@/elements/TodayWeather/TodayWeather";
import ErrorBox from "@/elements/Reusable/ErrorBox";
import { ALL_DESCRIPTIONS } from "@/utilities/DateConstants";
import { transformDateFormat } from "@/utilities/DatetimeUtils";
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from "../../utilities/DataUtils";
import { FaMapPin, FaSearch } from "react-icons/fa";

function WeatherForecasting() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to manage Search visibility

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(" ");

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });

      // Hide the search box after a location is set
      setIsSearchVisible(false);
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="text-[100px] sm:text-[120px] md:text-[140px] text-black opacity-85">
        {/* Add logo or icon here */}
      </div>
      <p className="text-center text-black text-opacity-85  text-sm sm:text-base mt-8 mx-auto max-w-[80%] leading-[22px]">
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </p>
    </div>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <div>
        <TodayWeather data={todayWeather} forecastList={todayForecast} />
      </div>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <div className="flex justify-center items-center w-full ">
        <LoadingBox value="1">
          <p className="text-black text-opacity-80 text-xs sm:text-sm  leading-none">
            Loading...
          </p>
        </LoadingBox>
      </div>
    );
  }

  return (
    <div className="container mx-auto rounded-xl bg-slate-100 relative">
      <div
        className="p-2 text-emerald-400  rounded-full  absolute top-4 right-4 hover:text-emerald-600"
        onClick={toggleSearchVisibility}
      >
        <FaSearch />
      </div>
      <div className="grid grid-cols-1 gap-4 m-2">
        {isSearchVisible && <Search onSearchChange={searchChangeHandler} />}
      </div>

      {appContent}
    </div>
  );
}

export default WeatherForecasting;
