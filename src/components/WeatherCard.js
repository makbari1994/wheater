import React from 'react';

function WeatherCard({ currentWeather, handleUnitChange }) {
  const { temp, weather, time } = currentWeather;

  const temperature = `${temp}°`;

 

  return (
    <div className="weather-card bg-white shadow-md p-6 rounded-lg text-center">
      <h1 className="text-xl font-semibold text-gray-800">{weather.description}</h1>
      <p className="text-4xl font-bold text-blue-600">{temperature}</p>
      <p className="text-sm text-gray-500">{time}</p>
      <img
        className="mx-auto my-4"
        src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
        alt="Weather Icon"
      />
      <button
        onClick={handleUnitChange}
        className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Switch Unit
      </button>
    </div>
  );
}

export default WeatherCard;
