const apiKey = "d467c8645e9d6507ec4d77aa97ee5a1e";
const API = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search");
const weatherImg = document.getElementById("weather-img");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const desciption = document.getElementById("status");
const temp = document.querySelector(".temp");
const error = document.getElementById("error");
const weatherContainer = document.getElementById("weather-container");

async function getWeatherData(city) {
  const response = await fetch(API + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weatherContainer.style.display = "none";
  } else {
    const data = await response.json();

    document.getElementById("city").innerHTML = data.name;
    temp.innerHTML = Math.floor(data.main.temp) + "°c";
    wind.innerHTML = data.wind.speed + " km/h";
    humidity.innerHTML = data.main.humidity + "%";
    desciption.innerHTML = data.weather[0].main;
    document.getElementById("temp").innerHTML =
      Math.floor(data.main.temp) + "°c";

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "images/snow.png";
    }

    error.style.display = "none";
    weatherContainer.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  getWeatherData(inputBox.value);
});

inputBox.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getWeatherData(inputBox.value);
  }
});
