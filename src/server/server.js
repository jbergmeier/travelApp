const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const JSONStream = require('JSONStream');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
//const dateFormat = require("dateformat");
const { getForecastWeather } = require('./js/getWeather');
const { memoryUsage } = require('process');

//global declaration
const port = process.env.PORT || 8099;
const app = express();

//Middelware
app.use(cors());
app.use(helmet());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

//Date Calc
let now = new Date();
let clacDays = 0;

const dateCalc = (date) => {
  const travelDate = Date.parse(date);
  // const nowDateRaw = Date.parse(now);
  // const testDate = dateFormat(travelDate, "yyyy-mm-dd"); //dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  const travelDateDays = Math.ceil((travelDate - now) / (24 * 60 * 60 * 1000));

  if (travelDateDays === -0) {
    calcDays = 0;
  } else if (travelDateDays < -0) {
    calcDays = -1;
  } else if (travelDateDays <= 15 && travelDateDays > -0) {
    calcDays = travelDateDays;
  } else if (travelDateDays > 15) {
    calcDays = 15;
  }
  return calcDays;
};

//Routes
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

let allCountriesFile = path.join(__dirname, 'json/allCountries.json');

app.get('/allCountries', (req, res) => {
  var readable = fs.createReadStream(allCountriesFile, { encoding: null });
  JSONStream.parse(readable.pipe(res));
});

app.post('/weatherData', async (req, res) => {
  const countryCode = req.body.country;
  const city = req.body.city;
  const dateOfTravel = req.body.travelDate;

  try {
    getForecastWeather(
      city,
      countryCode,
      dateCalc(dateOfTravel),
      ({ temperature, date, place, timezone, image, countryCode } = {}) => {
        res.json({ temperature, date, place, timezone, image, countryCode });
      }
    );
  } catch (e) {
    console.log(e);
    res.json({ message: 'error' }).status(400);
  }
});

// App listening
app.listen(port, async () => {
  console.log(`Server is running on Port: ${port}`);
});

module.exports = { app };
