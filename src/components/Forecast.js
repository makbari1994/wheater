import React from 'react';

function Forecast({ forecast }) {
  return (
    <div className="forecast grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {forecast.map((day) => (
        <div key={day.datetime} className="forecast-card bg-white shadow-md p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">{day.datetime}</p>
          <p className="text-2xl text-gray-800">{`${day.max_temp}° / ${day.min_temp}°`}</p>
          <img
            className="mx-auto my-4"
            src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
            alt="Weather Icon"
          />
        </div>
      ))}
    </div>
  );
}

export default Forecast;
