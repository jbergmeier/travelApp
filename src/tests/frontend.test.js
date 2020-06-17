const { getCurrentDate } = require("../client/js/getWeatherData");
const dateFormat = require("dateformat");
const now = new Date();
const nowDateRaw = Date.parse(now);
const testDate = dateFormat(nowDateRaw, "yyyy-mm-dd");

test("Check getCurrentDate", () => {
  expect(getCurrentDate()).toBe(testDate);
});
