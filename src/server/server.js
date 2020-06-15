const express = require("express");
const cors = require("cors");
const getWeather = require("./js/getWeather");

//global declaration
const port = process.env.PORT || 8099;
const app = express();

//Middelware
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Working");
});

// App listening
app.listen(port, async () => {
  console.log(`Server is running on Port: ${port}`);
});

getWeather("Hamburg", "de", ({ temperature } = {}) => {
  console.log("Hello, this is working and the temperature is " + temperature);
});
