const fetch = require("node-fetch");

const getTravelImage = async (city, callback) => {
  const url1 =
    "https://pixabay.com/api/?key=17055889-c7cc01eb0c090f40159b0b534&image_type=photo&pretty=true&category=city&q=" +
    city;

  await fetch(url1)
    .then((res) => res.json())
    .then((json) => {
      //console.log(json.geonames[0]);
      callback({
        newImage: json.hits[0].largeImageURL,
      });
    })
    .catch((err) => console.error(err));
};
module.exports = getTravelImage;
