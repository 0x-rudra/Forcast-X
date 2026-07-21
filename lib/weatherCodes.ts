import { WeatherInfo } from './types';

const weatherMap: Record<number, WeatherInfo> = {
  0: { icon: 'bx-sun', text: 'Clear Sky' },
  1: { icon: 'bx-cloud-light', text: 'Mainly Clear' },
  2: { icon: 'bx-cloud', text: 'Partly Cloudy' },
  3: { icon: 'bx-cloud', text: 'Overcast' },
  45: { icon: 'bx-water', text: 'Fog' },
  48: { icon: 'bx-water', text: 'Depositing Rime Fog' },
  51: { icon: 'bx-cloud-drizzle', text: 'Light Drizzle' },
  53: { icon: 'bx-cloud-drizzle', text: 'Moderate Drizzle' },
  55: { icon: 'bx-cloud-drizzle', text: 'Dense Drizzle' },
  61: { icon: 'bx-cloud-rain', text: 'Slight Rain' },
  63: { icon: 'bx-cloud-rain', text: 'Moderate Rain' },
  65: { icon: 'bx-cloud-rain', text: 'Heavy Rain' },
  71: { icon: 'bx-cloud-snow', text: 'Slight Snow' },
  73: { icon: 'bx-cloud-snow', text: 'Moderate Snow' },
  75: { icon: 'bx-cloud-snow', text: 'Heavy Snow' },
  77: { icon: 'bx-cloud-snow', text: 'Snow Grains' },
  80: { icon: 'bx-cloud-rain', text: 'Slight Rain Showers' },
  81: { icon: 'bx-cloud-rain', text: 'Moderate Rain Showers' },
  82: { icon: 'bx-cloud-lightning', text: 'Violent Rain Showers' },
  85: { icon: 'bx-cloud-snow', text: 'Slight Snow Showers' },
  86: { icon: 'bx-cloud-snow', text: 'Heavy Snow Showers' },
  95: { icon: 'bx-cloud-lightning', text: 'Thunderstorm' },
  96: { icon: 'bx-cloud-lightning', text: 'Thunderstorm with Hail' },
  99: { icon: 'bx-cloud-lightning', text: 'Heavy Thunderstorm with Hail' },
};

export function getWeatherInfo(code: number, isDay: number = 1): WeatherInfo {
  let info = weatherMap[code] ?? { icon: 'bx-cloud', text: 'Unknown' };
  if (code === 0 && !isDay) info = { icon: 'bx-moon', text: 'Clear Night' };
  if (code === 1 && !isDay) info = { icon: 'bx-cloud-light', text: 'Mainly Clear Night' };
  return info;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}
