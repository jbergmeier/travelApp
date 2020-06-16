import geocode from "../src/server/js/cityInfo";
const request = require("supertest");
const dateFormat = require("dateformat");
const now = new Date();
const nowDateRaw = Date.parse(now);
const testDate = dateFormat(nowDateRaw, "yyyy-mm-dd");

console.log(testDate);

// describe(geocode, () => {
//   test("geocode is defined", () => {
//     expect(geocode).toBeDefined;
//   });
// });
// describe("Test Endpoint", () => {
//   it("should get the weather", async () => {
//     const res = await request(app).post("/weatherData").send({
//       travelDate: "2020-06-26",
//       city: "Dublin",
//       country: "ie",
//     });
//     expect(res.statusCode).toEqual(200);
//   });
// });

const app = require("../server/server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(geocode);

it("all endpoint", async (done) => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
  done();
});
