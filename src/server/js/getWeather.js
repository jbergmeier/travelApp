const fetch = require("node-fetch");
const cityInfo = require("./cityInfo");

// get coordinates from cityInfo
const getWeather = async (city, countryCode, date, callback) => {
  let long = 0;
  let lat = 0;
  let weatherDate = date;

  var datetime = new Date();
  console.log(datetime);

  const api_key = "b5ee64e9bcea48dfa38ad2ec5e178e29";
  const url = "https://api.weatherbit.io/v2.0/current?&key=" + api_key;

  // Call city API to get Coordinates
  await cityInfo(city, countryCode, ({ latitude, longitude } = {}) => {
    console.log(longitude, latitude);
    lat = latitude;
    long = longitude;
  });

  //Call Weather API to get weather data with before requested coordniates
  const currentWeather = async (long, lat) => {
    await fetch(url + "&lat=" + lat + "&lon=" + long)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data[0].temp);
        callback({
          temperature: json.data[0].temp,
        });
      })
      .catch((err) => console.error(err));
  };
};

module.exports = getWeather;
