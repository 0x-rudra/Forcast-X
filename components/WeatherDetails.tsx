'use client';

import { WeatherCurrent, WeatherDaily } from '@/lib/types';

interface WeatherDetailsProps {
  current: WeatherCurrent;
  daily: WeatherDaily;
}

export default function WeatherDetails({ current, daily }: WeatherDetailsProps) {
  // Sunrise / Sunset formatting
  let sunriseSet = '--:--';
  if (daily.sunrise && daily.sunset && daily.sunrise.length > 0) {
    const sr = new Date(daily.sunrise[0]).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const ss = new Date(daily.sunset[0]).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    sunriseSet = `${sr} / ${ss}`;
  }

  const uvIndex =
    daily.uv_index_max && daily.uv_index_max.length > 0 ? daily.uv_index_max[0] : '--';

  const details = [
    { icon: 'bx-thermometer', label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}°C`, id: 'feels-like' },
    { icon: 'bx-droplet', label: 'Humidity', value: `${current.relative_humidity_2m}%`, id: 'humidity' },
    { icon: 'bx-wind', label: 'Wind', value: `${Math.round(current.wind_speed_10m)} km/h`, id: 'wind-speed' },
    { icon: 'bx-cloud', label: 'Cloud Cover', value: `${current.cloud_cover}%`, id: 'cloud-cover' },
    { icon: 'bx-show', label: 'Visibility', value: `${(current.visibility / 1000).toFixed(1)} km`, id: 'visibility' },
    { icon: 'bx-tachometer', label: 'Pressure', value: `${current.surface_pressure} hPa`, id: 'pressure' },
    { icon: 'bx-sun', label: 'UV Index', value: String(uvIndex), id: 'uv-index' },
    { icon: 'bx-sunrise', label: 'Sunrise/Set', value: sunriseSet, id: 'sunrise-set' },
  ];

  return (
    <div className="weather-details-grid">
      {details.map((d) => (
        <div className="detail-item" key={d.id}>
          <div className="icon-wrapper">
            <i className={`bx ${d.icon}`} />
          </div>
          <div className="detail-info">
            <span className="label">{d.label}</span>
            <span id={d.id} className="value">{d.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
