//CSS
import "./styles/main.scss";

document
  .getElementById("submitButton")
  .addEventListener("click", getWeatherData);
// JS
import { getWeatherData } from "./js/getWeatherData";

// EPXPORT
export { getWeatherData };
