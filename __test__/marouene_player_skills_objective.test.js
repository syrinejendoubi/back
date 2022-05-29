const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const moment = require("moment");
const UserModel = require("../models/userModel");
const skillModal = require("../models/skillsModel");
const disciplineModal = require("../models/disciplineModel");

describe("Les objective des compétence d'un joueur", () => {
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
    skill = await skillModal.create({
      skillName: "indurance",
      description: "Cette compétence permet de mesurer l'indurance d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 3,
      alerted: false,
      discipline: discipline._id,
    });
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all skill objectives by coach and player (empty objective) ", async () => {
      await request(app)
        .get("/api/SkillObjectives")
        .query({
          creactedBy: coach._id,
          player: player._id,
        })
        .expect(200)
        .then((res) => {
          expect(typeof res.body === "object").toBeTruthy();
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should add a skill's objective", async () => {
    const data = {
      player: player._id,
      skill: skill._id,
      value: 255,
      beforeDate: "2022-08-28",
      done: false,
      creactedBy: coach._id,
    };
    console.log("data : " + data);
    await request(app)
      .post("/api/skillObjective")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.player).toBe(data.player.toString());
        expect(response.body.skill).toBe(data.skill.toString());
        expect(response.body.value).toBe(data.value);
        expect(moment(response.body.beforeDate).format("YYYY-MM-DD")).toBe(
          data.beforeDate
        );
        expect(response.body.done).toBe(data.done);
        expect(response.body.creactedBy).toBe(data.creactedBy.toString());
        savedObjective = response.body;
      });
  });
  test("should through an error while adding a skill's objective (missing attribute)", async () => {
    const data = {
      value: 255,
      beforeDate: "2022-08-28",
      done: false,
      creactedBy: coach._id,
    };
    await request(app)
      .post("/api/skillObjective")
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
      .post("/api/skillObjective")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.message).toBe(
          "les champs ne peuvent pas étre vide"
        );
      });
  });
  test("should get all skill by Player and Coach", () => {
    request(app)
      .get(`/api/skillObjective`)
      .query({
        creactedBy: savedObjective.creactedBy,
        player: savedObjective.player,
      })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0].player._id).toBe(savedObjective.player);
        expect(res.body[0].skill._id).toBe(savedObjective.skill);
        expect(res.body[0].creactedBy._id).toBe(savedObjective.creactedBy);
        expect(res.body[0].value).toBe(savedObjective.value);
        expect(res.body[0].beforeDate).toBe(savedObjective.beforeDate);
      });
  });

  test("should return a single skill's objective", async function () {
    console.log(savedObjective._id);
    await request(app)
      .get(`/api/skillObjectives/${savedObjective._id}`)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedObjective._id);
        expect(res.body.player._id).toBeTruthy();
        expect(res.body.skill._id).toBeTruthy();
        expect(res.body.creactedBy._id).toBeTruthy();
        expect(res.body.value).toBe(savedObjective.value);
        expect(res.body.beforeDate).toBe(savedObjective.beforeDate);
        expect(res.body.done).toBe(savedObjective.done);
      });
  });
  test("should return an error while retrieving a single skill objective (invalid key) ", async function () {
    wrongId = "6231bf786725280bf7288f02";
    await request(app)
      .get("/api/skillObjectives/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(`objective not found with id ${wrongId}`);
      });
  });

  test("should update a skill's objective", async () => {
    const data = {
      value: 500,
      beforeDate: "2022-09-28",
    };
    await request(app)
      .put("/api/skillObjectives/" + savedObjective._id)
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
  test("should generate an error while updating a skill's objective (empty object)", async () => {
    const data = {};
    await request(app)
      .put("/api/skillObjectives/" + savedObjective._id)
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("les champs ne peuvent pas étre vide");
      });
  });
  test("should delete a single skill by id", async () => {
    await request(app)
      .delete("/api/skillObjectives/" + savedObjective._id)

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("objective deleted successfully!");
      });
  });
  test("should through an  error when deleting a single skill objective (invalid key) ", async () => {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .delete("/api/skillObjectives/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("objective not found with id " + wrongId);
      });
  });
});
