const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const assignChallenge = require("../models/assignChallengeModel");
const User = require("../models/userModel");
const Defi = require("../models/defiModel");

describe("Discipline", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    newCoach = await User.create({
      firstName: "Hassene",
      lastName: "Ayoub",
      email: "hassene.ayoub@yahoo.fr",
      role: "coach",
      password: "123456",
      sexe: "Homme",
    });
    newPlayer = await User.create({
      firstName: "Marouene",
      lastName: "Ayoub",
      email: "marouene.ayoub@gmail.com",
      role: "joueur",
      password: "123456",
      sexe: "Homme",
    });
    newDefi = await Defi.create({
      defiName: "20 pushups",
      defiObjectif: "getting stronger",
      defiVisible: true,
    });
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
  test("should assign challenge to a specific player", async () => {
    const NewChallenge = {
      defi: newDefi._id,
      createdBy: newCoach._id,
      assignedTo: [newPlayer._id],
    };
    const expectedResult = {
      defi: newDefi._id,
      createdBy: newCoach._id,
      assignedTo: [newPlayer._id],
    };
    await request(app)
      .post("/api/assignerdefi")
      .send(NewChallenge)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject(NewChallenge);
        savedAssignedChallenge = res.body;
        const addedAssignedChallenge = await assignChallenge.findOne({
          _id: res.body._id,
        });
        expect(addedAssignedChallenge).toBeTruthy();
        expect(addedAssignedChallenge).toMatchObject(expectedResult);
      });
  });

  test("should throw bad request error (400) when trying to assign challenge with empty req body", async () => {
    await request(app)
      .post("/api/assignerdefi")
      .send()
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Defi content can not be empty");
      });
  });
  test("should retrieve all coach assigned challenges", async () => {
    await request(app)
      .get("/api/coach/defis/assignes")
      .query({ createdBy: newCoach._id })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0].createdBy).toBe(newCoach._id.toString());
      });
  });
  test("should retrieve all player assigned challenges", async () => {
    await request(app)
      .get("/api/player/defis/assignes")
      .query({ assignedTo: newPlayer._id })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
      });
  });

  test("should throw bad request error (400) when trying to update assigned challenge with empty req body", async () => {
    await request(app)
      .put("/api/player/defi/marquerFini/" + savedAssignedChallenge._id)
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Challenge content can not be empty");
      });
  });
  test("should throw not found error (404) when trying to update assigned challenge with non existing object id", async () => {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    await request(app)
      .put("/api/player/defi/marquerFini/" + randomMongoId)
      .send({ done: newPlayer._id })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Challenge not found ");
      });
  });
});
test("should throw not found error (404) when trying to update assigned challenge with invalid object id", async () => {
  invalidMongoId = "123";
  await request(app)
    .put("/api/player/defi/marquerFini/" + invalidMongoId)
    .send({ done: newPlayer._id })
    .expect(404)
    .then((res) => {
      expect(res.body.message).toBe("Challenge not found");
    });
});
