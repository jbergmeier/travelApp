import getTravelImage from "../../server/js/getPicture";

const getWeatherData = () => {
  event.preventDefault();
  const url = "/weatherData";
  // get / set Date
  const getCurrentDate = () => {
    let d = new Date();
    var n = d.toISOString().substring(0, 10);
    return n;
  };
  const dateNow = getCurrentDate();

  // get Data from view
  //getting and setting date
  let get_travelDate = document.getElementById("input_date").value;
  if (get_travelDate === "") {
    get_travelDate = dateNow;
    console.log("No Date defined, setting it to " + dateNow);
  }

  // Getting and/or setting Place
  let get_travelPlace = document.getElementById("input_place").value;
  if (get_travelPlace === "") {
    get_travelPlace = "London";
    console.log("No City defined, setting it to London");
  }

  // Getting and/or setting CountryCode
  let get_countryCode = document.getElementById("input_countryCode").value;
  if (get_countryCode === "") {
    get_countryCode = "GB";
    console.log("No Country defined, setting it to GB");
  }

  let request = {
    travelDate: get_travelDate,
    city: get_travelPlace,
    country: get_countryCode,
  };

  // get Elements from View
  const weather_table = document.getElementById("weather_table");
  console.log("fetching weather data");
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      // Fill header with Travel place and country code
      document.getElementById("main_placeName").innerHTML =
        "<h2>" + res.place + ", " + res.countryCode + "</h2>";

      // Fill weather and timezone Data
      document.getElementById("temperature").innerHTML =
        res.temperature + " &deg Celsius";

      document.getElementById("timezone").innerText = res.timezone;
      document.getElementById("date").innerText = res.date;

      // Parse Image from API
      document.getElementById("main_image").setAttribute("src", res.image);
    });
};

export { getWeatherData };
