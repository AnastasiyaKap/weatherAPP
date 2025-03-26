import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
  FaSmog,
} from 'react-icons/fa';
import axios from 'axios';
import styles from './Weather.module.css';
import Clock from './Time';

const API_KEY = '';


function WeatherForm() {
  const [city, setCity] = useState('Москва');
  const [weather, setWeather] = useState(null);

  const date = new Date();

  const weekDay = () => {
    switch (date.getDay()) {
      case 0:
        return 'Воскресенье';
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
        );
        setWeather(response.data);
      } catch (error) {
        setWeather(null);
      }
    };
    const timeOutId = setTimeout(fetchData, 800);
    return () => clearTimeout(timeOutId);
  }, [city]);

  const setUpBackImage = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return '';

    const weatherDescript = weather.weather[0].main;

    switch (weatherDescript) {
      case 'Clear':
        return styles.sunny;
      case 'Clouds':
        return styles.clouds;
      case 'Rain':
      case 'Drizzle':
        return styles.rain;
      case 'Thunderstorm':
        return styles.storm;
      case 'Snow':
        return styles.snow;
      case 'Fog':
      case 'Mist':
      case 'Haze':
        return styles.foggy;
      default:
        return styles.default;
    }
  };

  const setUpIcon = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return '';

    const condition = weather.weather[0].main;

    switch (condition) {
      case 'Clear':
        return <FaSun size={24} />;
      case 'Clouds':
        return <FaCloud size={24} />;
      case 'Rain':
      case 'Drizzle':
        return <FaCloudRain size={24} />;
      case 'Thunderstorm':
        return <FaBolt size={24} />;
      case 'Snow':
        return <FaSnowflake size={24} />;
      case 'Fog':
      case 'Mist':
      case 'Haze':
        return <FaSmog size={24} />;
      default:
        return styles.default;
    }
  };

  //   console.log(weatherDescript);
  return (
    <div className={`${styles.weatherForm} ${setUpBackImage()}`}>
      {weather ? (
        <div className={styles.weatherFormInfo}>
          <div className={styles.weatherFormInfoValue}>
            <div className={styles.weatherTemp}>
              <h3>{weather.main.temp}°</h3>
            </div>
            <div className={styles.weatherCity}>
              <h1>{weather.name}</h1>
              <div className={styles.weatherCityInfo}>
                <Clock />
                <p>{weekDay()}</p>
                <p>
                  {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.
                  {date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1}
                </p>
              </div>
            </div>
            <div className={styles.weatherIcon}>{setUpIcon()}</div>
          </div>
        </div>
      ) : (
        <p>Enter city... </p>
      )}
      <div className={styles.inputFormInfo}>
        <h3>Weather</h3>
        <div className={styles.inputFormSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <CiSearch className={styles.inputFormSearchIcon} />
        </div>
        <div className={styles.createLine} />
        {weather ? (
          <div className={styles.inputFormweatherDetails}>
            <h3>Weather Details</h3>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Скорость ветра</p>
              <p className={styles.value}>{weather.wind.speed}</p>
            </div>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Минимальная температура</p>
              <p className={styles.value}>{weather.main.temp_min}</p>
            </div>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Максимальная температура</p>
              <p className={styles.value}>{weather.main.temp_max}</p>
            </div>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Ощущается как</p>
              <p className={styles.value}>{weather.main.feels_like}</p>
            </div>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Влажность</p>
              <p className={styles.value}>{weather.main.humidity}</p>
            </div>
            <div className={styles.weatherDetails}>
              <p className={styles.options}>Погодные условия</p>
              <p className={styles.value}>{weather.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <p>Идет загрузка ...</p>
        )}

        <div className={styles.createLine} />
      </div>
    </div>
  );
}

export default WeatherForm;
