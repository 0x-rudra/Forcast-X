'use client';

import { WeatherDaily } from '@/lib/types';
import ForecastItem from './ForecastItem';

interface ForecastPanelProps {
  daily: WeatherDaily;
}

export default function ForecastPanel({ daily }: ForecastPanelProps) {
  const days = [];
  for (let i = 1; i <= 5; i++) {
    if (i >= daily.time.length) break;
    days.push({
      dateString: daily.time[i],
      weatherCode: daily.weather_code[i],
      maxTemp: Math.round(daily.temperature_2m_max[i]),
      minTemp: Math.round(daily.temperature_2m_min[i]),
      uvMax: daily.uv_index_max[i] ?? '--',
      rainProb: daily.precipitation_probability_max
        ? `${daily.precipitation_probability_max[i]}%`
        : '--',
      windMax: daily.wind_speed_10m_max
        ? `${Math.round(daily.wind_speed_10m_max[i])} km/h`
        : '--',
    });
  }

  return (
    <div className="glass-panel forecast-panel">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list" id="forecast-list">
        {days.map((day) => (
          <ForecastItem key={day.dateString} {...day} />
        ))}
      </div>
    </div>
  );
}
