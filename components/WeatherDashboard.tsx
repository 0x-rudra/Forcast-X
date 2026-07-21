'use client';

import { WeatherData, AqiCurrent } from '@/lib/types';
import { getWeatherInfo, formatDate } from '@/lib/weatherCodes';
import AqiBanner from './AqiBanner';
import WeatherDetails from './WeatherDetails';
import ForecastPanel from './ForecastPanel';

interface WeatherDashboardProps {
  weatherData: WeatherData;
  aqiData: AqiCurrent | null;
  locationName: string;
}

export default function WeatherDashboard({
  weatherData,
  aqiData,
  locationName,
}: WeatherDashboardProps) {
  const { current, daily } = weatherData;
  const weatherInfo = getWeatherInfo(current.weather_code, current.is_day);
  const dateStr = formatDate(new Date());

  return (
    <section id="weather-dashboard" className="dashboard">
      {/* Current Weather */}
      <div className="glass-panel current-weather-panel">
        <div className="location-header">
          <h1 id="city-name">{locationName}</h1>
          <p id="date">{dateStr}</p>
        </div>

        <div className="weather-main-display">
          <div className="temp-container">
            <span id="temperature">{Math.round(current.temperature_2m)}</span>
            <span className="unit">°C</span>
          </div>

          <div className="condition-container">
            <i id="weather-icon" className={`bx ${weatherInfo.icon}`} />
            <p id="condition">{weatherInfo.text}</p>
          </div>

          {aqiData && <AqiBanner aqi={aqiData} />}
        </div>

        <WeatherDetails current={current} daily={daily} />
      </div>

      {/* Forecast */}
      <ForecastPanel daily={daily} />
    </section>
  );
}
