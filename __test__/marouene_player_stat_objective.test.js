const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const moment = require("moment");
const UserModel = require("../models/userModel");
const statisticModal = require("../models/statisticModel");
const disciplineModal = require("../models/disciplineModel");

describe("Les objective des statistique d'un joueur", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    player = await UserModel.create({
      firstName: "Marouene",
      lastName: "Ayoub",
      email: "marwen.ayoub@outlook.com",
      password: "123456",
      dateOfBirth: "1998-03-28",
      city: "Mahdia",
      sexe: "Homme",
      role: "joueur",
    });
    coach = await UserModel.create({
      firstName: "Hassene",
      lastName: "Ayoub",
      email: "hassene.ayoub@yahoo.com",
      password: "123456",
      dateOfBirth: "1998-03-20",
      city: "Tunis",
      sexe: "Homme",
      role: "coach",
    });
    discipline = await disciplineModal.create({
      label: "tennis",
      icon: "tennis-icon",
    });
    statistic = await statisticModal.create({
      statisticName: "vitesse",
      statisticType: "compteur",
      unit: "KM/h",
      description: "Cette statistique permet de mesurer la vitesse d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: discipline._id,
    });
    // console.log("player : " + player);
    // console.log("coach : " + coach);
    // console.log("discipline : " + discipline);
    // console.log("statistic : " + statistic);
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all statistic objectives by coach and player (empty objective) ", async () => {
      await request(app)
        .get(
          "/api/StatObjectives?creactedBy=6248cc7d5c813ecf19b27257&player=6224de0c71b53ad1b4a2ac23"
        )
        .expect(200)
        .then((res) => {
          expect(typeof res.body === "object").toBeTruthy();
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should add a statistic's objective", async () => {
    const data = {
      player: player._id,
      statistic: statistic._id,
      value: 255,
      beforeDate: "2022-08-28",
      done: false,
      creactedBy: coach._id,
    };
    console.log("data : " + data);
    await request(app)
      .post("/api/statObjective")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.player).toBe(data.player.toString());
        expect(response.body.statistic).toBe(data.statistic.toString());
        expect(response.body.value).toBe(data.value);
        expect(moment(response.body.beforeDate).format("YYYY-MM-DD")).toBe(
          data.beforeDate
        );
        expect(response.body.done).toBe(data.done);
        expect(response.body.creactedBy).toBe(data.creactedBy.toString());
        savedObjective = response.body;
      });
  });
  test("should through an error while adding a statistic's objective (missing attribute)", async () => {
    const data = {
      value: 255,
      beforeDate: "2022-08-28",
      done: false,
      creactedBy: "6248cc7d5c813ecf19b27257",
    };
    await request(app)
      .post("/api/statObjective")
      .send(data)
      .expect(500)
      .then(async (response) => {
        expect(response.body.message).toBe(
          "Enter tous les champs de l'objective"
        );
      });
  });
  test("should return an error while adding a new objective (req.body is empty)", async () => {
    const data = {};
    await request(app)
      .post("/api/statObjective")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.message).toBe("Les champs ne peut pas être vide");
      });
  });
  test("should get all statistics by Player and Coach", () => {
    request(app)
      .get(`/api/StatObjectives`)
      .query({
        creactedBy: savedObjective.creactedBy,
        player: savedObjective.player,
      })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0].player._id).toBe(savedObjective.player);
        expect(res.body[0].statistic._id).toBe(savedObjective.statistic);
        expect(res.body[0].creactedBy._id).toBe(savedObjective.creactedBy);
        expect(res.body[0].value).toBe(savedObjective.value);
        expect(res.body[0].beforeDate).toBe(savedObjective.beforeDate);
      });
  });

  test("should return a single statistic's objective", async function () {
    // console.log(savedObjective._id);
    await request(app)
      .get(`/api/statisticObjectives/${savedObjective._id}`)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedObjective._id);
        expect(res.body.player._id).toBeTruthy();
        expect(res.body.statistic._id).toBeTruthy();
        expect(res.body.creactedBy._id).toBeTruthy();
        expect(res.body.value).toBe(savedObjective.value);
        expect(res.body.beforeDate).toBe(savedObjective.beforeDate);
        expect(res.body.done).toBe(savedObjective.done);
      });
  });
  test("should return an error while retrieving a single statistic objective (invalid key) ", async function () {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .get("/api/statisticObjectives/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("objective not found with id " + wrongId);
      });
  });

  test("should update a statistic's objective", async () => {
    const data = {
      value: 500,
      beforeDate: "2022-09-28",
    };
    await request(app)
      .put("/api/statisticObjectives/" + savedObjective._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedObjective._id);
        expect(res.body.value).toBe(data.value);
        expect(moment(res.body.beforeDate).format("YYYY-MM-DD")).toBe(
          data.beforeDate
        );
      });
  });
  test("should generate an error while updating a statistic's objective (empty object)", async () => {
    const data = {};
    await request(app)
      .put("/api/statisticObjectives/" + savedObjective._id)
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("les champs ne peuvent pas étre vide");
      });
  });
  test("should delete a single statistic by id", async () => {
    await request(app)
      .delete("/api/statObjectives/" + savedObjective._id)

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("objective deleted successfully!");
      });
  });
  test("should through an  error when deleting a single statistic objective (invalid key) ", async () => {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .delete("/api/statObjectives/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("objective not found with id " + wrongId);
      });
  });
});
