const apiKey = '934b8bee29f3f352c150ab43cfe6633d'; // Replace with your actual API key
const lat = 9.0579;
const lon = 7.4951;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    // ----- Fetch Current Weather -----
    const currentRes = await fetch(currentWeatherURL);
    if (!currentRes.ok) throw new Error(`Current Weather Error: ${currentRes.status}`);
    const currentData = await currentRes.json();

    const currentTemp = currentData.main.temp.toFixed(1);
    const high = currentData.main.temp_max.toFixed(1);
    const low = currentData.main.temp_min.toFixed(1);
    const humidity = currentData.main.humidity;
    const description = currentData.weather[0].description;
    const iconCode = currentData.weather[0].icon;
    const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update current weather UI
    document.getElementById('current-temp').textContent = `${currentTemp}`;
    document.getElementById('weather-desc').textContent = description;
    document.getElementById('high-temp').textContent = `${high}`;
    document.getElementById('low-temp').textContent = `${low}`;
    document.getElementById('humidity').textContent = `${humidity}`;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    const iconImg = document.getElementById('weather-icon');
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.alt = description;

    // ----- Fetch Forecast -----
    const forecastRes = await fetch(forecastURL);
    if (!forecastRes.ok) throw new Error(`Forecast Error: ${forecastRes.status}`);
    const forecastData = await forecastRes.json();

    // Process next 3 days (excluding today)
    const dailyTemps = {};
    forecastData.list.forEach(entry => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString(undefined, { weekday: 'long' });

      if (!dailyTemps[day]) dailyTemps[day] = [];
      dailyTemps[day].push(entry.main.temp);
    });

    const uniqueDays = Object.keys(dailyTemps).slice(1, 4); // Skip today, get next 3 days

    uniqueDays.forEach((day, index) => {
      const temps = dailyTemps[day];
      const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
      const forecastSpan = document.getElementById(`forecast-day${index + 1}`);
      if (forecastSpan) forecastSpan.textContent = `${avgTemp}`;
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

getWeather();

