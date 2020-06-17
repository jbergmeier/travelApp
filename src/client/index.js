//CSS
import "./styles/main.scss";
import { getWeatherData } from "./js/getWeatherData";

const dateFormat = require("dateformat");
const now = new Date();
const nowDateRaw = Date.parse(now);
const curDate = dateFormat(nowDateRaw, "yyyy-mm-dd");

//Add Event Listener on Button
document
  .getElementById("submitButton")
  .addEventListener("click", getWeatherData);

// Set Date
document.getElementById("input_date").setAttribute("value", curDate);
document.getElementById("input_date").setAttribute("min", curDate);

// EPXPORT
export { getWeatherData };
