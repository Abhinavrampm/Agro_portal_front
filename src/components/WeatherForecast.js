import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Trivandrum'); // Default location
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; // Access the API key from environment variables

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again.');
      }
    };

    fetchWeather();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const newLocation = form.location.value;
    setLocation(newLocation);
    form.reset();
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
