'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Image from 'next/image';

export default function Page() {
  const params = useParams();
  const city = params.city;

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetch(`https://weatherapp-bwfv.onrender.com/api/weather/city/${city}`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === '404') {
            setError('City not found.');
          } else {
            setWeather(data.data);
            // console.log(data.data)
            const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
            if (!history.includes(city)) {
              history.push(city);
              localStorage.setItem('searchHistory', JSON.stringify(history));
            }
          }
        })
        .catch(() => setError('Failed to fetch weather.'));
    }
  }, [city]);

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 backdrop-blur-md rounded-lg mt-5 p-7 text-white grid md:grid-cols-[auto_1fr] gap-6 items-center">
        {/* Left: Weather Icon */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={
              weather?.weather[0]?.icon
                ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                : ''
            }
            alt="weather icon"
            className="w-30 h-30"
          />
        </div>

        {/* Right: Weather Details */}
        <div className="w-full">
          {/* Top Row: City + Temp */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <p className="text-4xl font-bold">{weather?.name || 'City'}</p>
            <p className="text-2xl">{weather?.main?.temp}°C</p>
          </div>

          {/* Middle Row: Humidity, Pressure, Max, Min */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-center">
            <p className="bg-white/20 p-3 rounded">Humidity: {weather?.main?.humidity}%</p>
            <p className="bg-white/20 p-3 rounded">Pressure: {weather?.main?.pressure} hPa</p>
            <p className="bg-white/20 p-3 rounded">Max: {weather?.main?.temp_max}°C</p>
            <p className="bg-white/20 p-3 rounded">Min: {weather?.main?.temp_min}°C</p>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <p className="bg-white/20 p-3 rounded">Lon: {weather?.coord?.lon}</p>
            <p className="bg-white/20 p-3 rounded">Lat: {weather?.coord?.lat}</p>
            <p className="bg-white/20 p-3 rounded">{weather?.weather[0]?.main}</p>
            <p className="bg-white/20 p-3 rounded">Wind: {weather?.wind?.speed} m/s</p>
          </div>
        </div>
      </div>

      {/* Error and loading states */}
      {error && (
        <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>
      )}
      {!weather && !error && (
        <p className="mt-4 text-white text-center font-semibold">Loading...</p>
      )}

    </Layout>
  );
}
