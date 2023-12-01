import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';

const CustomWeather = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = '89baa9234736bb6e046877160c0dbbd6'; 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=43.6532&lon=-79.3832&appid=${API_KEY}`);
        setWeatherInfo(response.data);
        setWeatherDetails(response.data.current);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-message">
        Loading...
      </div>
    );
  }

  const currentDate = new Date();
  const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

  return (
    <div>
      <div className="weather-header">
        <h1 className="weather-app-title">MY CUSTOM WEATHER APP</h1>
      </div>
      <div className="weather-wrapper">
        <div className="weather-container">
          <div className="city-info">
            <h1>Toronto, ON, Canada</h1>
          </div>

          <div className="clearfix"></div>

          <div className="weather-details">
            <div className="weather-icon">
              <i className="custom-icon sun spin glow"></i>
              <i className="custom-icon cloud wind"></i>
              <i className="custom-icon cloud two"></i>
              {weatherDetails && (
                <img
                  height={150}
                  width={200}
                  src={`https://openweathermap.org/img/wn/10d@2x.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
            <div className="temperature">
              <div className="current-temp">
                {(weatherDetails && (weatherDetails.temp - 273.15).toFixed(2))}&deg;
              </div>
              <div className="weather-main">
                <b>{weatherDetails && weatherDetails.weather[0].main}</b>
              </div>
              <div className="description">
                Description: {weatherDetails && weatherDetails.weather[0].description}
              </div>
            </div>
            <div className="clearfix"></div>

            <div className="arrow left">
              <i className="fa fa-angle-left"></i>
            </div>

            <div className="date">
              <p>{currentDate.toISOString().split('T')[0]}</p>
            </div>
            <div className="current-time">
              <p>{currentTime}</p>
            </div>
            <div className="arrow right">
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWeather;
