const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
const User = require("../models/userModel");
const { send } = require("express/lib/response");

describe("Auth", () => {
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

    token = newCoach.getSignedJwtToken();
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });

  test("should throw bad request(400) error when register (providing missing cridentials)", async () => {
    registerData = {
      firstName: "Marouene",
      lastName: "Ayoub",
      role: "coach",
      password: "123456",
      sexe: "Homme",
    };
    await request(app)
      .post("/api/register")
      .send(registerData)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "Veuillez fournir tous les renseignements requis"
        );
      });
  });
  test("should throw unauthorized(401) error (providing already existing email)", async () => {
    registerData = {
      firstName: "Hassene",
      lastName: "Ayoub",
      email: "hassene.ayoub@yahoo.fr",
      role: "coach",
      password: "123456",
      sexe: "Homme",
      dateOfBirth: "2020-05-05",
      city: "Tunis",
    };
    await request(app)
      .post("/api/register")
      .send(registerData)
      .expect(401)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "Utilisateur existe déjà s’il vous plaît rediriger vers la page de connexion"
        );
      });
  });
  test("should successfully register", async () => {
    registerData = {
      firstName: "Marouene",
      lastName: "Ayoub",
      email: "marouene.ayoub@yahoo.fr",
      role: "coach",
      password: "123456",
      sexe: "Homme",
      dateOfBirth: "2020-05-05",
      city: "Tunis",
    };
    await request(app)
      .post("/api/register")
      .send(registerData)
      .expect(200)
      .then((res) => {
        NewCoach2 = res.body;
        expect(res.body).toBeTruthy();
        expect(res.body.user).toBeTruthy();
        expect(res.body.token).toBeTruthy();
      });
  });

  test("should login successfully and get access token", async () => {
    await request(app)
      .post("/api/login")
      .send({
        "email": "ayacoach@gmail.com",
        "password": "ayacoach"
    })
      .expect(200)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.user).toBeTruthy();
        expect(res.body.token).toBeTruthy();
      });
  });
  test("should throw unauthorized(401) error when login (providing incorrect credentials)", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "marouene.ayoub@gmail.fr", password: "123456" })
      .expect(401)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "Les informations de connexion fournies sont invalides"
        );
      });
  });
  test("should throw bad request(400) error when login (not providing all fields) ", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "marouene.ayoub@gmail.fr" })
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "veuillez fournir l'email et le mot de passe"
        );
      });
  });
  test("should throw bad unauthorized(401) error when login (not providing an invalid password) ", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "hassene.ayoub@yahoo.fr", password: "20222022" })
      .expect(401)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "Les informations de connexion fournies sont invalides"
        );
      });
  });
});
