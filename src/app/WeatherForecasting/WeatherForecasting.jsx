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
import SpinLoader from "@/elements/Loaders/SpinLoader";

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
      <div className="text-[100px] sm:text-[120px] md:text-[140px] text-black opacity-85"></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="outdoor"
        viewBox="0 0 1024 768"
        className="mx-auto h-24 w-auto text-black "
      >
        <path
          d="M521 692s30-143 68-209 97-249 362-232 284 108 327 209 108 86 133 139 13 66 13 66Z"
         fill="#f8f8ff"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="M521 692s27 30 24 37-74 85 56 111 641 38 712 6 46-48 20-81 51-1 68-35a282.55 282.55 0 0 0 23-65Z"
          fill="#f5f5fc"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="M1422.14 626.83S1320 526.48 1025 588.48 624 576 580 576s-46.25 116.25-46.25 116.25l890.13-27.08 2.39-7.57a27 27 0 0 0 .38-7l-.38-4.6a41.21 41.21 0 0 0-.57-4.12Z"
          fill="#e9edfa"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="M520.62 691.64s-111.81-56.37 0-86.86c0 0 49-126.6 137.69-16.63 0 0 81.32-8.32 83.17 46.2 0 0 17.56 12 44.36 14.79s28.65 24.95 23.1 31.42-24.94 8.31-24.94 8.31Z"
          fill="#a9d9c8"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="M541.9 690.82s-82.46-41.57 0-64.06c0 0 36.12-93.36 101.54-12.27 0 0 60-6.13 61.33 34.07 0 0 12.95 8.86 32.71 10.9s21.13 18.4 17 23.17-18.4 6.13-18.4 6.13ZM1363.61 666.88l-.09-246.29s-118.38-9.36-100.88-83.5c11.52-48.83 50.48-52.67 49.54-78.42-.68-18.6 16.23-94.76 67.33-53.27 40.37 32.78 21.4 59.81 42.25 63.65 21.35 3.93 47.4 39.84 32.92 60.9s1.65 21.84 1.65 32.37 8.56 41.15-34.88 49-51.86 10.42-51.86 10.42l3.65 245.09Z"
          fill="#b9eddb"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="M1335.28 667.85V543.91s-40.81-4.72-34.78-42.12c4-24.63 17.4-26.57 17.08-39.56-.23-9.38 5.6-47.8 23.21-26.87 13.92 16.53 7.38 30.17 14.56 32.11 7.36 2 16.34 20.1 11.35 30.72s.57 11 .57 16.33 3 20.76-12 24.74-15.4 4-15.4 4l.24 124.2Z"
          fill="#b9eddb"
          transform="translate(-470.92 -193.2)"
        ></path>
        <path
          d="m1297.76 669 .12-208.45s84.11-7.92 71.68-70.7c-8.19-41.35-35.87-44.6-35.2-66.39.48-15.75-11.53-80.23-47.84-45.1-28.68 27.75-15.2 50.64-30 53.89-15.17 3.33-33.68 33.73-23.39 51.57s-1.17 18.49-1.17 27.41-6.08 34.84 24.79 41.53 36.85 8.82 36.85 8.82l-2.3 207.54Z"
          fill="#a9d9c8"
          transform="translate(-470.92 -193.2)"
        ></path>
        <circle cx="315.12" cy="218.48" r="23.87"  fill="#fff"></circle>
        <circle cx="234.38" cy="217.9" r="23.87"  fill="#fff"></circle>
        <circle cx="275.64" cy="216.88" r="32.15"  fill="#fff"></circle>
        <circle cx="617.74" cy="165.1" r="23.87"  fill="#fff"></circle>
        <circle cx="658.99" cy="164.09" r="32.15"  fill="#fff"></circle>
      </svg>
            {/* <p className=" hidden sm:block mb-1"> */}
      <p className="text-center text-opacity-85   sm:text-base mt-8 mx-auto max-w-[80%] leading-[22px] text-base text-gray-500 dark:text-gray-400">
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

          <div className="flex items-center justify-center m-2">
          <div className="animate-spin rounded-full border-t-4 h-28 w-28 border-green-700 border-solid border-opacity-50"></div>
        </div>

    );
  }

  return (
    <div className="flex flex-col items-start ">
      <h2 className="font-bold mb-4 text-xl lg:text-2xl md:text-2xl mr-2 m-2">
        Current Weather
      </h2>
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
    </div>
  );
}

export default WeatherForecasting;
