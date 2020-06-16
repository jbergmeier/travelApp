const request = require("supertest");

import { app } from "../src/server/server";
describe("Test Endpoint", () => {
  it("should get the weather", async () => {
    const res = await request(app).post("/weatherData").send({
      travelDate: "2020-06-26",
      city: "Dublin",
      country: "ie",
    });
    expect(res.statusCode).toEqual(200);
  });
});
