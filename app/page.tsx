'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeatherData, AqiCurrent, AppStatus } from '@/lib/types';
import { fetchCityCoords, fetchWeatherByCoords } from '@/lib/api';
import AuroraBackground from '@/components/AuroraBackground';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorPanel from '@/components/ErrorPanel';
import WeatherDashboard from '@/components/WeatherDashboard';

export default function HomePage() {
  const [status, setStatus] = useState<AppStatus>('loading');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aqiData, setAqiData] = useState<AqiCurrent | null>(null);
  const [locationName, setLocationName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLocationActive, setIsLocationActive] = useState(false);

  const loadWeather = useCallback(async (fetcher: () => Promise<{ weatherData: WeatherData; aqiData: AqiCurrent | null; locationName: string }>) => {
    setStatus('loading');
    try {
      const result = await fetcher();
      setWeatherData(result.weatherData);
      setAqiData(result.aqiData);
      setLocationName(result.locationName);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather data.';
      setErrorMsg(message);
      setStatus('error');
    }
  }, []);

  // Initial load: default city
  useEffect(() => {
    loadWeather(() => fetchCityCoords('New Delhi'));
  }, [loadWeather]);

  const handleSearch = (city: string) => {
    setIsLocationActive(false);
    loadWeather(() => fetchCityCoords(city));
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      setStatus('error');
      return;
    }
    setIsLocationActive(true);
    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await loadWeather(() => fetchWeatherByCoords(latitude, longitude, 'Your Location'));
      },
      () => {
        setIsLocationActive(false);
        setErrorMsg('Location access denied or unavailable.');
        setStatus('error');
      }
    );
  };

  return (
    <>
      <AuroraBackground />
      <main className="app-container">
        <SearchBar
          onSearch={handleSearch}
          onGeolocate={handleGeolocate}
          isLocationActive={isLocationActive}
        />

        {status === 'loading' && <LoadingSpinner />}
        {status === 'error' && <ErrorPanel message={errorMsg} />}
        {status === 'success' && weatherData && (
          <WeatherDashboard
            weatherData={weatherData}
            aqiData={aqiData}
            locationName={locationName}
          />
        )}
      </main>
    </>
  );
}
