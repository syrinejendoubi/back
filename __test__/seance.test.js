const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Seance", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all seances (empty seances) ", async () => {
      await request(app)
        .get("/api/seances")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a seance empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/seances")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Seance content can not be empty");
      });
  });

  test("should get all seances", () => {
    request(app)
      .get("/api/seances")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedSeance._id);
        expect(res.body[0].title).toBe(savedSeance.title);
        expect(res.body[0].description).toBe(savedSeance.description);
      });
  });
});
