import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import '../styles/WeatherPage.css';

// SearchBar Component
const SearchBar = ({ input, setInput, search }) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				className="city-search"
				placeholder="Enter City Name.."
				name="query"
				value={input}
				onChange={(event) => setInput(event.target.value)}
				onKeyPress={search}
			/>
		</div>
	);
};

// LoadingSpinner Component
const LoadingSpinner = () => (
	<div>
		<br />
		<br />
		<Oval type="Oval" color="black" height={100} width={100} />
	</div>
);

// ErrorMessage Component
const ErrorMessage = () => (
	<div>
		<br />
		<br />
		<span className="error-message">
			<FontAwesomeIcon icon={faFrown} />
			<span style={{ fontSize: '20px' }}>City not found</span>
		</span>
	</div>
);

// WeatherDisplay Component
const WeatherDisplay = ({ weatherData }) => {
	const toDateFunction = () => {
		const months = [
			'January', 'February', 'March', 'April', 'May',
			'June', 'July', 'August', 'September', 'October',
			'November', 'December',
		];
		const WeekDays = [
			'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
			'Friday', 'Saturday',
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
		return date;
	};

	return (
		<div>
			<div className="city-name">
				<h2>
					{weatherData.name}, <span>{weatherData.sys.country}</span>
				</h2>
			</div>
			<div className="date">
				<span>{toDateFunction()}</span>
			</div>
			<div className="icon-temp">
				<img
					src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
					alt={weatherData.weather[0].description}
				/>
				{Math.round(weatherData.main.temp)}
				<sup className="deg">°C</sup>
			</div>
			<div className="des-wind">
				<p>{weatherData.weather[0].description.toUpperCase()}</p>
				<p>Wind Speed: {weatherData.wind.speed} m/s</p>
			</div>
		</div>
	);
};

// Main Component
const WeatherPage = () => {
	const [input, setInput] = useState('');
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setInput('');
			setWeather({ ...weather, loading: true });
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const api_key = 'a1261fdbd807312e84b79a61ca2ca284'; // Replace with your OpenWeatherMap API key
			await axios
				.get(url, {
					params: {
						q: input,
						units: 'metric',
						appid: api_key,
					},
				})
				.then((res) => {
					setWeather({ data: res.data, loading: false, error: false });
				})
				.catch((error) => {
					setWeather({ ...weather, data: {}, error: true });
					setInput('');
				});
		}
	};

	// Function to fetch weather by geolocation
	const fetchWeatherByLocation = async (latitude, longitude) => {
		setWeather({ ...weather, loading: true });
		const url = 'https://api.openweathermap.org/data/2.5/weather';
		const api_key = 'a1261fdbd807312e84b79a61ca2ca284';
		await axios
			.get(url, {
				params: {
					lat: latitude,
					lon: longitude,
					units: 'metric',
					appid: api_key,
				},
			})
			.then((res) => {
				setWeather({ data: res.data, loading: false, error: false });
			})
			.catch((error) => {
				setWeather({ ...weather, data: {}, error: true });
			});
	};

	// Always ask for location when visiting this page
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchWeatherByLocation(latitude, longitude);
				},
				(error) => {
					console.error(error); 
					setWeather({ ...weather, error: true });
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
			setWeather({ ...weather, error: true });
		}
	}, []); 

	return (
		<div className="App">
			<h1 className="app-name">See the Weather</h1>
			<SearchBar input={input} setInput={setInput} search={search} />
			{weather.loading && <LoadingSpinner />}
			{weather.error && <ErrorMessage />}
			{weather && weather.data && weather.data.main && (
				<WeatherDisplay weatherData={weather.data} />
			)}
		</div>
	);
};

export default WeatherPage;
