//CSS
import './styles/main.scss';
import { getWeatherData } from './js/getWeatherData';
import { getCountries } from './js/getCountries';

const dateFormat = require('dateformat');
const now = new Date();
const nowDateRaw = Date.parse(now);
const curDate = dateFormat(nowDateRaw, 'yyyy-mm-dd');

//Add Event Listener on Button
document
  .getElementById('submitButton')
  .addEventListener('click', getWeatherData);

// Set Date -- Default Today
document.getElementById('input_date').setAttribute('value', curDate);
document.getElementById('input_date').setAttribute('min', curDate);

// Set Endate -- Default Today
document.getElementById('input_date_end').setAttribute('value', curDate);

// Fill Dropdown in View with all Countries
getCountries();

// EPXPORT
export { getWeatherData, getCountries };
