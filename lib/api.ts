import { WeatherData, AqiCurrent } from './types';

export interface FetchResult {
  weatherData: WeatherData;
  aqiData: AqiCurrent | null;
  locationName: string;
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  locationName: string
): Promise<FetchResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,wind_speed_10m,apparent_temperature,cloud_cover,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;
  const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto`;

  const [weatherRes, aqiRes] = await Promise.all([
    fetch(url),
    fetch(aqiUrl).catch(() => null),
  ]);

  if (!weatherRes.ok) throw new Error('Weather data not found');

  const weatherData: WeatherData = await weatherRes.json();
  const aqiData: AqiCurrent | null =
    aqiRes && aqiRes.ok ? (await aqiRes.json()).current : null;

  return { weatherData, aqiData, locationName };
}

export async function fetchCityCoords(city: string): Promise<FetchResult> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('City not found. Please try a different name.');
  }

  const result = data.results[0];
  const locName = result.admin1
    ? `${result.name}, ${result.admin1}`
    : `${result.name}, ${result.country}`;

  return fetchWeatherByCoords(result.latitude, result.longitude, locName);
}
