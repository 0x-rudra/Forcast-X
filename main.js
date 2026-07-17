

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const dashboard = document.getElementById('weather-dashboard');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

// Current Weather Elements
const cityNameEl = document.getElementById('city-name');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const weatherIconEl = document.getElementById('weather-icon');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');
const uvIndexEl = document.getElementById('uv-index');
const feelsLikeEl = document.getElementById('feels-like');
const cloudCoverEl = document.getElementById('cloud-cover');
const visibilityEl = document.getElementById('visibility');
const sunriseSetEl = document.getElementById('sunrise-set');

// AQI Elements
const aqiValueEl = document.getElementById('aqi-value');
const aqiStatusEl = document.getElementById('aqi-status');
const aqiBanner = document.getElementById('aqi-banner');
const pm25El = document.getElementById('pm25-val');
const pm10El = document.getElementById('pm10-val');
const no2El = document.getElementById('no2-val');
const o3El = document.getElementById('o3-val');
const coEl = document.getElementById('co-val');

// Forecast Element
const forecastList = document.getElementById('forecast-list');

// Weather Code Mapping to Boxicons and Description
const weatherMap = {
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
    99: { icon: 'bx-cloud-lightning', text: 'Heavy Thunderstorm with Hail' }
};

function getWeatherInfo(code, isDay = 1) {
    let info = weatherMap[code] || { icon: 'bx-cloud', text: 'Unknown' };
    if (code === 0 && !isDay) info = { icon: 'bx-moon', text: 'Clear Night' };
    if (code === 1 && !isDay) info = { icon: 'bx-cloud-light', text: 'Mainly Clear Night' };
    return info;
}

function formatDate(dateString) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

const showLoading = () => {
    dashboard.classList.add('hidden');
    errorMsg.classList.add('hidden');
    loading.classList.remove('hidden');
};

const showError = (msg) => {
    loading.classList.add('hidden');
    dashboard.classList.add('hidden');
    errorText.textContent = msg;
    errorMsg.classList.remove('hidden');
};

const updateUI = (current, daily, aqiCurrent, locationName) => {
    loading.classList.add('hidden');

    // Update Header
    cityNameEl.textContent = locationName;
    dateEl.textContent = formatDate(new Date());

    // Update Current Weather
    tempEl.textContent = Math.round(current.temperature_2m);

    const weatherInfo = getWeatherInfo(current.weather_code, current.is_day);
    conditionEl.textContent = weatherInfo.text;
    weatherIconEl.className = `bx ${weatherInfo.icon}`;

    // Update Details
    feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°C`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windSpeedEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    cloudCoverEl.textContent = `${current.cloud_cover}%`;
    visibilityEl.textContent = `${(current.visibility / 1000).toFixed(1)} km`;
    pressureEl.textContent = `${current.surface_pressure} hPa`;

    // Some endpoints might not return uv_index in current, so we grab max from today
    uvIndexEl.textContent = daily.uv_index_max && daily.uv_index_max.length > 0
                                ? daily.uv_index_max[0] : '--';

    // Format sunrise and sunset times
    if (daily.sunrise && daily.sunset && daily.sunrise.length > 0) {
        const sr = new Date(daily.sunrise[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const ss = new Date(daily.sunset[0]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        sunriseSetEl.textContent = `${sr} / ${ss}`;
    } else {
        sunriseSetEl.textContent = '--:--';
    }

    // Update AQI
    if (aqiCurrent && aqiCurrent.us_aqi !== undefined) {
        const aqi = aqiCurrent.us_aqi;
        aqiValueEl.textContent = aqi;
        aqiBanner.classList.remove('hidden');

        aqiStatusEl.className = 'aqi-status'; // Reset classes
        if (aqi <= 50) {
            aqiStatusEl.textContent = 'Good';
            aqiStatusEl.classList.add('aqi-good');
        } else if (aqi <= 100) {
            aqiStatusEl.textContent = 'Moderate';
            aqiStatusEl.classList.add('aqi-fair');
        } else {
            aqiStatusEl.textContent = 'Poor';
            aqiStatusEl.classList.add('aqi-poor');
        }

        // Update Pollutants
        pm25El.textContent = Math.round(aqiCurrent.pm2_5) || '--';
        pm10El.textContent = Math.round(aqiCurrent.pm10) || '--';
        no2El.textContent = Math.round(aqiCurrent.nitrogen_dioxide) || '--';
        o3El.textContent = Math.round(aqiCurrent.ozone) || '--';
        coEl.textContent = Math.round(aqiCurrent.carbon_monoxide) || '--';
    } else {
        aqiBanner.classList.add('hidden');
    }

    // Update Forecast
    forecastList.innerHTML = '';

    // Display next 5 days
    for(let i = 1; i <= 5; i++) {
        if(i >= daily.time.length) break;

        const fDate = new Date(daily.time[i]);
        const dayName = fDate.toLocaleDateString('en-US', { weekday: 'short' });
        const fInfo = getWeatherInfo(daily.weather_code[i]);
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);

        // Extra details for expansion
        const uvMax = daily.uv_index_max[i] || '--';
        const rainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] + '%' : '--';
        const windMax = daily.wind_speed_10m_max ? Math.round(daily.wind_speed_10m_max[i]) + ' km/h' : '--';

        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div class="forecast-item-header">
                <span class="forecast-day">${dayName}</span>
                <span class="forecast-condition" title="${fInfo.text}"><i class='bx ${fInfo.icon}'></i></span>
                <div class="forecast-temp">
                    <span class="max">${maxTemp}°</span>
                    <span class="min">${minTemp}°</span>
                </div>
            </div>
            <div class="forecast-details">
                <div class="f-detail"><i class='bx bx-wind'></i> Wind: ${windMax}</div>
                <div class="f-detail"><i class='bx bx-cloud-rain'></i> Rain: ${rainProb}</div>
                <div class="f-detail"><i class='bx bx-sun'></i> UV Max: ${uvMax}</div>
            </div>
        `;

        // Toggle expansion on click
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });

        forecastList.appendChild(item);
    }

    dashboard.classList.remove('hidden');
};

const fetchWeather = async (lat, lon, locationName) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,surface_pressure,wind_speed_10m,apparent_temperature,cloud_cover,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;
        const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto`;

        const [weatherRes, aqiRes] = await Promise.all([
            fetch(url),
            fetch(aqiUrl).catch(() => null) // Fallback if AQI fails
        ]);

        if (!weatherRes.ok) throw new Error("Weather data not found");

        const data = await weatherRes.json();
        const aqiData = aqiRes && aqiRes.ok ? await aqiRes.json() : null;

        updateUI(data.current, data.daily, aqiData ? aqiData.current : null, locationName);
    } catch (err) {
        showError("Failed to fetch weather data.");
        console.error(err);
    }
};

const fetchCityCoords = async (city) => {
    showLoading();
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const locName = result.admin1 ? `${result.name}, ${result.admin1}` : `${result.name}, ${result.country}`;
            await fetchWeather(result.latitude, result.longitude, locName);
        } else {
            showError("City not found. Please try a different name.");
        }
    } catch (err) {
        showError("Network error. Please try again later.");
        console.error(err);
    }
};

const fetchWeatherByLocation = () => {
    showLoading();
    locationBtn.classList.add('location-active');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // Reverse geocoding to get city name is complex with free APIs,
            // so we'll just say "Current Location"
            await fetchWeather(latitude, longitude, "Your Location");
        }, (err) => {
            locationBtn.classList.remove('location-active');
            showError("Location access denied or unavailable.");
        });
    } else {
        showError("Geolocation is not supported by your browser.");
    }
};

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        locationBtn.classList.remove('location-active');
        fetchCityCoords(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            locationBtn.classList.remove('location-active');
            fetchCityCoords(city);
        }
    }
});

locationBtn.addEventListener('click', fetchWeatherByLocation);

// Initial Load: Try location, fallback to default city
fetchCityCoords("New Delhi");
