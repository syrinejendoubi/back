const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/userModel");
const Alert = require("../models/AlertModal");
const Statistic = require("../models/statisticModel");
const Discipline = require("../models/disciplineModel");

describe("Alert", () => {
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
      firstName: "Hassene",
      lastName: "Ayoub",
      email: "hassene.ayoub@gmail.com",
      role: "joueur",
      password: "123456",
      sexe: "Homme",
    });
    newPlayer2 = await User.create({
      firstName: "Syrine",
      lastName: "Ben fraj",
      email: "syrine.benfraj@gmail.com",
      role: "joueur",
      password: "123456",
      sexe: "Femme",
    });

    newDiscipline = await Discipline.create({
      label: "update disicpline",
      icon: "updateIcon",
    });
    newStatistic = await Statistic.create({
      statisticName: newPlayer._id,
      statisticType: "compteur",
      unit: "Kg",
      sexe: "Homme",
      alerted: true,
      discipline: newDiscipline._id,
      description: "my description",
    });
    newAlert = await Alert.create({
      player: newPlayer._id,
      coach: newCoach._id,
      statistique: newStatistic._id,
    });
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should find alert with specific id", async () => {
      await request(app)
        .get("/api/coach/alerts")
        .query({ player: newAlert.player })
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body[0]._id).toBe(newAlert._id.toString());
        });
    });
  test("should throw bad request error (400) when trying to update alert with empty req body", async () => {
    await request(app)
      .put("/api/coach/alerts/" + newAlert._id)
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Alert content can not be empty");
      });
  });
  test("should throw bad request error (400) when trying to update alert with empty req body", async () => {
    await request(app)
      .put("/api/coach/alerts/" + newAlert._id)
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Alert content can not be empty");
      });
  });
  test("should throw not found error (404) when trying to update alert with non existing object id", async () => {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    updatedAlert = {
      player: newPlayer2._id,
      coach: newCoach._id,
      statistique: newStatistic._id,
    };
    await request(app)
      .put("/api/coach/alerts/" + randomMongoId)
      .send(updatedAlert)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Alert not found ");
      });
  });
  test("should throw not found error (404) when trying to update assigned challenge with invalid object id", async () => {
    invalidMongoId = "123";
    await request(app)
      .put("/api/coach/alerts/" + invalidMongoId)
      .send(updatedAlert)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Alert not found");
      });
  });
  test("should update alert with specified object id", async () => {
    await request(app)
      .put("/api/coach/alerts/" + newAlert._id)
      .send(updatedAlert)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body).toMatchObject(updatedAlert);
      });
  });
});
