export interface WeatherCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  is_day: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  apparent_temperature: number;
  cloud_cover: number;
  visibility: number;
}

export interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface AqiCurrent {
  us_aqi: number;
  pm10: number;
  pm2_5: number;
  carbon_monoxide: number;
  nitrogen_dioxide: number;
  ozone: number;
}

export interface WeatherData {
  current: WeatherCurrent;
  daily: WeatherDaily;
}

export interface WeatherInfo {
  icon: string;
  text: string;
}

export type AppStatus = 'idle' | 'loading' | 'error' | 'success';
