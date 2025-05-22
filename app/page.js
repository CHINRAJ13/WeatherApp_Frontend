'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(`https://weatherapp-bwfv.onrender.com/api/weather/current?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setWeather(data.data);
    });
  }, []);

  // Fetch city suggestions based on input value
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    // OpenWeatherMap Geocoding API (free tier allows 5 calls per second)
    // Replace YOUR_API_KEY with your actual OpenWeatherMap API key
    const apiKey = 'a99c2f499856c9feecb1c9cbbee38739';
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data); // data is an array of city objects
      // console.log(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSuggestions(value);
  };

  // When user clicks on suggestion
  const handleSuggestionClick = (city) => {
    setSearch(city.name);
    setSuggestions([]);
    router.push(`/weather/${city.name}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/weather/${search.trim()}`);
  };

  return (
    <Layout>
      <div className="p-6 relative w-[90%] mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Current Location Weather</h1>

        {/* Search bar with suggestions */}
        <form onSubmit={handleSearch} className="mb-6 relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Enter city name"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {suggestions.map((city, index) => (
                <li
                  key={`${city.name}-${city.lat}-${city.lon}-${index}`}
                  onClick={() => handleSuggestionClick(city)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-700 text-white"
                >
                  {city.name}
                  {city.state ? `, ${city.state}` : ''}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Weather display */}
        {weather ? (
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 backdrop-blur-md rounded-lg p-7 text-white grid md:grid-cols-[auto_1fr] gap-6 items-center shadow-md">
            {/* Left: Weather Icon */}
            <div className="flex justify-center md:justify-start">
              <Image
                src={
                  weather?.weather[0]?.icon
                    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                    : ''
                }
                alt="weather icon"
                className="w-24 h-24 md:w-30 md:h-30"
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
                <p className="bg-white/20 p-3 rounded-md">Humidity: {weather?.main?.humidity}%</p>
                <p className="bg-white/20 p-3 rounded-md">Pressure: {weather?.main?.pressure} hPa</p>
                <p className="bg-white/20 p-3 rounded-md">Max: {weather?.main?.temp_max}°C</p>
                <p className="bg-white/20 p-3 rounded-md">Min: {weather?.main?.temp_min}°C</p>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <p className="bg-white/20 p-3 rounded-md">Lon: {weather?.coord?.lon}</p>
                <p className="bg-white/20 p-3 rounded-md">Lat: {weather?.coord?.lat}</p>
                <p className="bg-white/20 p-3 rounded-md">{weather?.weather[0]?.main}</p>
                <p className="bg-white/20 p-3 rounded-md">Wind: {weather?.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        )}
      </div>

    </Layout>
  );
}
