const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const TrainingGround = require("../models/trainingGroundModel");
const User = require("../models/userModel");

describe("Training Ground", () => {
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
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should return empty array (empty training ground array)  ", async () => {
      await request(app)
        .get("/api/getTrainingGrounds/" + newCoach._id)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.data.length).toEqual(0);
        });
    });
  test("should create a training ground", async () => {
    const newTrainingGround = {
      city: "Tunis",
      address: "Av hbib bourgiba",
      coordinates: [34.17999758688084, 10.008544921875002],
      createdBy: newCoach._id,
    };
    await request(app)
      .post("/api/createTrainingGround")
      .send(newTrainingGround)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.type).toBe("success");
        expect(res.body.message).toBe(
          "Le lieu d'entainement a été ajouté avec succès."
        );
        addedTrainingGround = await TrainingGround.findOne({});
        expect(addedTrainingGround).toBeTruthy();
        expect(addedTrainingGround).toMatchObject(newTrainingGround);
      });
  }),
    test("should return all training grounds of a specific coach", async () => {
      await request(app)
        .get("/api/getTrainingGrounds/" + newCoach._id)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.type).toBe("success");
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.data.length).toEqual(1);
          expect(res.body.data[0]._id.toString()).toBe(
            addedTrainingGround._id.toString()
          );
        });
    });
  test("should throw bad request(400) error when fetching training ground  (invalid mongoose id)", async () => {
    invalidMongooseId = "123";
    await request(app)
      .get("/api/getTrainingGrounds/" + invalidMongooseId)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Veuillez fournir une id valide");
      });
  });
  test("should throw bad request(400) error when updating training ground (not all required fields are provided)", async () => {
    const newTrainingGround = {
      address: "Isamm Manouba",
      coordinates: [34.1799975868202, 10.00854492187608],
      createdBy: newCoach._id,
    };
    await request(app)
      .post("/api/updateTrainingGround/" + addedTrainingGround._id)
      .send(newTrainingGround)
      .expect(400)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe(
          "Veuillez fournir tous les renseignements requis"
        );
      });
  });
  test("should throw bad request(400) error when updating training ground (invalid mongoose id)", async () => {
    const newTrainingGround = {
      city: "Tunis",
      address: "Isamm Manouba",
      coordinates: [34.1799975868202, 10.00854492187608],
      createdBy: newCoach._id,
    };
    await request(app)
      .post("/api/updateTrainingGround/" + invalidMongooseId)
      .send(newTrainingGround)
      .expect(400)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Veuillez fournir une id valide");
      });
  });
  test("should update specified training ground", async () => {
    const newTrainingGround = {
      city: "Sousse",
      address: "ISSAT Sousse",
      coordinates: [34.1799975868202, 10.00854492187608],
      createdBy: newCoach._id,
    };
    await request(app)
      .post("/api/updateTrainingGround/" + addedTrainingGround._id)
      .send(newTrainingGround)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.type).toBe("success");
        expect(res.body.message).toBe(
          "l’emplacement a été mis à jour avec succès"
        );
      });
  });

  test("should throw bad request(400) error when deleting training ground  (invalid mongoose id)", async () => {
    await request(app)
      .delete("/api/deleteTrainingGround/" + invalidMongooseId)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe("Veuillez fournir une id valide");
      });
  });

  test("should throw not found (404) error when deleting training ground (non existing object id )", async () => {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    await request(app)
      .delete("/api/deleteTrainingGround/" + randomMongoId)
      .expect(404)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.type).toBe("error");
        expect(res.body.message).toBe(
          "Lieu d'entrainement non trouvé avec id spécifiée"
        );
      });
  });
  test("should delete training ground with specific id", async () => {
    await request(app)
      .delete("/api/deleteTrainingGround/" + addedTrainingGround._id)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.type).toBe("success");
        expect(res.body.message).toBe("Lieu supprimé avec succès !");
      });
  });
});
