import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './components/WeatherCard';
import ErrorBoundary from './components/ErrorBoundary';
import Forecast from './components/Forecast';

function App() {
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    // Get user's location on mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        setError('Unable to retrieve your location.');
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [location, unit]);

  const fetchWeatherData = async (lat, lon) => {
    const url = `${process.env.REACT_APP_WEATHER_API_URL}/current`;
    const forecastUrl = `${process.env.REACT_APP_WEATHER_API_URL}/forecast/daily`;

    try {
      const currentResponse = await axios.get(url, {
        params: {
          lat,
          lon,
          key: process.env.REACT_APP_WEATHER_API_KEY,
          units: unit
        }
      });
      const forecastResponse = await axios.get(forecastUrl, {
        params: {
          lat,
          lon,
          key: process.env.REACT_APP_WEATHER_API_KEY,
          units: unit,
          days: 7
        }
      });
      setCurrentWeather(currentResponse.data.data[0]);
      setForecast(forecastResponse.data.data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    }
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <ErrorBoundary>
      <div className="App min-h-screen bg-blue-50 flex flex-col items-center justify-center py-4">
        {error && <p className="text-red-600">{error}</p>}
        {currentWeather && (
          <WeatherCard
            currentWeather={currentWeather}
            handleUnitChange={handleUnitChange}
          />
        )}
        <button
          onClick={() => fetchWeatherData(location.lat, location.lon)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Refresh Weather
        </button>
        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
