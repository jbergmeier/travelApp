import { calcDuration } from './calcDuration';

const getCurrentDate = () => {
  let d = new Date();
  var n = d.toISOString().substring(0, 10);
  return n;
};

const getWeatherData = () => {
  event.preventDefault();
  const url = 'http://localhost:8099/weatherData';
  // get / set Date
  const dateNow = getCurrentDate();

  // get Data from view
  //getting and setting date
  let get_travelDate = document.getElementById('input_date').value;
  if (get_travelDate === '') {
    get_travelDate = dateNow;
    console.log('No Date defined, setting it to ' + dateNow);
  }

  // Getting and/or setting Place
  let get_travelPlace = document.getElementById('input_place').value;
  if (get_travelPlace === '') {
    get_travelPlace = 'London';
    console.log('No City defined, setting it to London');
  }

  // Getting and/or setting CountryCode
  let strCountry = document.getElementById('countryList');
  let get_countryCode = strCountry.options[strCountry.selectedIndex].value;
  let getCountryName = strCountry.options[strCountry.selectedIndex].innerText;
  console.log(get_countryCode);
  if (get_countryCode === '' || get_countryCode === 'Choose State/Province') {
    get_countryCode = 'GB';
    getCountryName = 'United Kingdom';
    console.log('No Country defined, setting it to GB');
  }

  //calc travelDuration
  let get_travelEndDate = document.getElementById('input_date_end').value;
  console.log('Duration: ' + calcDuration(get_travelDate, get_travelEndDate));
  document.getElementById('travel_duration').innerText = calcDuration(
    get_travelDate,
    get_travelEndDate
  );

  // Build request Body for fetch call
  let request = {
    travelDate: get_travelDate,
    city: get_travelPlace,
    country: get_countryCode,
  };
  console.log(request);

  // get Elements from View
  console.log('fetching weather data');
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      // Fill header with Travel place and country code
      document.getElementById('main_placeName').innerHTML =
        '<h2>' + res.place + ', ' + getCountryName + '</h2>';

      // Fill weather and timezone Data
      document.getElementById('temperature').innerHTML =
        res.temperature + ' &deg Celsius';

      document.getElementById('timezone').innerText = res.timezone;
      document.getElementById('date').innerText = res.date;

      // Parse Image from API
      document.getElementById('main_image').setAttribute('src', res.image);
    });
};

export { getWeatherData, getCurrentDate };
