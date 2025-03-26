const request = require("supertest");
const app = require("../app");

describe("User Routes", () => {
  test("GET /users should return an empty list initially", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});