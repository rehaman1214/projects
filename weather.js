// JavaScript code to fetch and display weather data based on user input
const API_KEY = "87da0e14278d9d7145aaaba3036c8d4d"; // Your API key

// Event listener for the "Get Weather" button
document.getElementById("search-btn").addEventListener("click", () => {
  const cityName = document.getElementById("city-input").value.trim(); // Get the city name from input

  if (!cityName) {
    // If no city name is entered, show an error message
    document.getElementById("error-message").textContent =
      "Please enter a city name.";
    document.getElementById("error-message").classList.remove("hidden");
    document.getElementById("weather-details").classList.add("hidden");
    return;
  }

  // Construct the URL with the city name
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Extract weather details from the first forecast entry
      const weather = data.list[0];
      const temperature = weather.main.temp;
      const condition = weather.weather[0].description;
      const humidity = weather.main.humidity;
      const windSpeed = weather.wind.speed;

      // Update the HTML content with the weather data
      document.getElementById("city-name").textContent = `Weather Forecast for ${data.city.name}, ${data.city.country}`;
      document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
      document.getElementById("weather").textContent = `Condition: ${condition}`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${windSpeed} m/s`;

      // Display the weather details section and hide error messages
      document.getElementById("weather-details").classList.remove("hidden");
      document.getElementById("error-message").classList.add("hidden");
    })
    .catch(error => {
      console.error("Error fetching data:", error);

      // Display an error message if the city name is invalid or API fails
      document.getElementById("error-message").textContent =
        "Failed to fetch weather data. Please check the city name and try again.";
      document.getElementById("error-message").classList.remove("hidden");
      document.getElementById("weather-details").classList.add("hidden");
    });
});
