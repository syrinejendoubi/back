const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Discipline", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all disciplines (empty disciplines) ", async () => {
      await request(app)
        .get("/api/disciplines")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should add a discipline", async () => {
    const data = {
      label: "test",
      icon: "test",
    };
    await request(app)
      .post("/api/disciplines")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.label).toBe(data.label);
        expect(response.body.icon).toBe(data.icon);
        savedDiscipline = response.body;
      });
  });

  test("should get all tasks", () => {
    request(app)
      .get("/api/disciplines")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedDiscipline._id);
        expect(res.body[0].label).toBe(savedDiscipline.label);
        expect(res.body[0].icon).toBe(savedDiscipline.icon);
      });
  });

  test("should return a single discipline", async function () {
    await request(app)
      .get("/api/disciplines/" + savedDiscipline._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedDiscipline._id);
        expect(res.body.label).toBe(savedDiscipline.label);
        expect(res.body.icon).toBe(savedDiscipline.icon);
      });
  });

  test("should update a discipline", async () => {
    const data = {
      label: "test",
      icon: "testIcon",
    };
    await request(app)
      .put("/api/disciplines/" + savedDiscipline._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedDiscipline._id.toString());
        expect(res.body.label).toBe(data.label);
        expect(res.body.icon).toBe(data.icon);
      });
  });
});
