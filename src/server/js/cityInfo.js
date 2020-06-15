const fetch = require("node-fetch");

const geocode = async (city, countryCode, callback) => {
  const url =
    "http://api.geonames.org/search?q=" +
    city +
    "&country=" +
    countryCode +
    "&maxRows=1&type=json&username=jbergmeier";

  await fetch(url, {
    //body: JSON.stringify(body), // for POST
    headers: { "content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      //console.log(json.geonames[0]);
      callback({
        longitude: json.geonames[0].lng,
        latitude: json.geonames[0].lat,
      });
    })
    .catch((err) => console.error(err));
};
module.exports = geocode;
