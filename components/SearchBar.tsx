'use client';

import { useState, KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
  isLocationActive: boolean;
}

export default function SearchBar({ onSearch, onGeolocate, isLocationActive }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="top-nav">
      <div className="search-bar">
        <i className="bx bx-search" />
        <input
          id="city-input"
          type="text"
          placeholder="Search city..."
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          id="search-btn"
          className="icon-btn"
          aria-label="Search"
          onClick={handleSearch}
        >
          <i className="bx bx-right-arrow-alt" />
        </button>
        <button
          id="location-btn"
          className={`icon-btn ${isLocationActive ? 'location-active' : ''}`}
          aria-label="Use current location"
          onClick={onGeolocate}
        >
          <i className="bx bx-target-lock" />
        </button>
      </div>
    </header>
  );
}
