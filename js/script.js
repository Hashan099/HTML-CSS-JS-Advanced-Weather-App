//event lisner to check for DOM fully loded
document.addEventListener("DOMContentLoaded", getuserinput());
const city = document.getElementById("location");
const temperature = document.getElementById("Temperature");
const feelslike = document.getElementById("Feels-like");
const minimum = document.getElementById("Minimum");
const maximum = document.getElementById("Maximum");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const weather = document.getElementById("currentweather");

//function to get the input from the user
function getuserinput() {
  const searchbutton = document.querySelector(".searchButton");
  searchbutton.addEventListener("click", () => {
    const city = document.getElementById("searchInput").value;
    const encodedCity = encodeURIComponent(city);
    getWeatherdata(encodedCity);
  });
}

//getting the weather data related to the location from the API
const getWeatherdata = async (city) => {
  const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5eaaff8d9dmsh766f773101a4fbfp1c1939jsnc938fd32095b",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //passing the data to the processdata function after parsing it
    processdata(result);
  } catch (error) {
    console.error(error);
  }
};

//funtion to handal the reveived data
function processdata(result) {
  const weatherdata = result;
  //check for the request if needed
  console.log(weatherdata);

  //object to process the api data
  const weatherdetails = {
    location: weatherdata.name,
    temp: weatherdata.main.temp,
    feelsLike: weatherdata.main.feels_like,
    tempMin: weatherdata.main.temp_min,
    tempMax: weatherdata.main.temp_max,
    humidity: weatherdata.main.humidity,
    pressure: weatherdata.main.pressure,
    windspeed: weatherdata.wind.speed,
    currentweather: weatherdata.weather[0].description,
  };

  displaydata(weatherdetails);
}

//function to update the dom
function displaydata(weatherdetails) {
  city.innerText = weatherdetails.location;
  temperature.innerText = weatherdetails.temp;
  feelslike.innerText = weatherdetails.feelsLike;
  minimum.innerText = weatherdetails.tempMin;
  maximum.innerText = weatherdetails.tempMax;
  wind.innerText = weatherdetails.windspeed;
  pressure.innerText = weatherdetails.pressure;
  humidity.innerText = weatherdetails.humidity;
  weather.innerText = weatherdetails.currentweather;
}
