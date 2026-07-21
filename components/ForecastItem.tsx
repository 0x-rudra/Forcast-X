'use client';

import { useState } from 'react';
import { getWeatherInfo } from '@/lib/weatherCodes';

interface ForecastItemProps {
  dateString: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  uvMax: number | string;
  rainProb: string;
  windMax: string;
}

export default function ForecastItem({
  dateString,
  weatherCode,
  maxTemp,
  minTemp,
  uvMax,
  rainProb,
  windMax,
}: ForecastItemProps) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(dateString);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const info = getWeatherInfo(weatherCode);

  return (
    <div
      className={`forecast-item ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded((p) => !p)}
    >
      <div className="forecast-item-header">
        <span className="forecast-day">{dayName}</span>
        <span className="forecast-condition" title={info.text}>
          <i className={`bx ${info.icon}`} />
        </span>
        <div className="forecast-temp">
          <span className="max">{maxTemp}°</span>
          <span className="min">{minTemp}°</span>
        </div>
      </div>
      <div className="forecast-details">
        <div className="f-detail">
          <i className="bx bx-wind" /> Wind: {windMax}
        </div>
        <div className="f-detail">
          <i className="bx bx-cloud-rain" /> Rain: {rainProb}
        </div>
        <div className="f-detail">
          <i className="bx bx-sun" /> UV Max: {uvMax}
        </div>
      </div>
    </div>
  );
}
