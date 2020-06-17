const fetch = require("node-fetch");
const cityInfo = require("./cityInfo");
const getTravelImage = require("./getPicture");
require("dotenv").config();

const api_key = process.env.API_KEY_WEATHER;

let long = -78.638;
let lat = 35.775;
let testPic = "";

const getForecastWeather = async (city, countryCode, days, callback) => {
  //URL
  console.log(city, days, countryCode);
  const url = "https://api.weatherbit.io/v2.0/forecast/daily?&key=" + api_key;
  try {
    // Call city API to get Coordinates
    await cityInfo(city, countryCode, ({ latitude, longitude } = {}) => {
      lat = latitude;
      long = longitude;
    });

    await getTravelImage(city, ({ newImage } = {}) => {
      testPic = newImage;
    });

    //Call Weather API to get weather data with before requested coordniates
    await fetch(url + "&lat=" + lat + "&lon=" + long)
      .then((res) => res.json())
      .then((json) => {
        // let resultData = json.data;
        callback({
          temperature: json.data[days].max_temp,
          date: json.data[days].valid_date,
          place: json.city_name,
          countryCode: json.country_code,
          timezone: json.timezone,
          image: testPic,
        });
      })
      .catch((err) => console.error(err));
  } catch (e) {
    console.log(e);
  }
};

// getForecastWeather(
//   "hamm",
//   "de",
//   4,
//   ({ temperature, date, place, timezone, image } = {}) => {
//     console.log({ temperature, date, place, timezone, image });
//   }
// );

module.exports = { getForecastWeather };
