const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");
const Discipline = require("../models/disciplineModel");

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
    test("should return empty array (empty disciplines array) ", async () => {
      await request(app)
        .get("/api/disciplines")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should add a discipline", async () => {
    const newDiscipline = {
      label: "new Discipline",
      icon: "new Discipline icon",
    };
    await request(app)
      .post("/api/disciplines")
      .send(newDiscipline)
      .expect(200)
      .then(async (res) => {
        expect(res.body).toBeTruthy();
        expect(res.body.label).toBe(newDiscipline.label);
        expect(res.body.icon).toBe(newDiscipline.icon);
        savedDiscipline = res.body;
        const addedDiscipline = await Discipline.findOne({
          _id: res.body._id,
        });
        expect(addedDiscipline).toBeTruthy();
        expect(addedDiscipline.label).toBe(newDiscipline.label);
        expect(addedDiscipline.icon).toBe(newDiscipline.icon);
      });
  });

  test("should throw bad request error (400) when trying to add discipline with empty req body", async () => {
    await request(app)
      .post("/api/disciplines")
      .send()
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Discipline content can not be empty");
      });
  });

  test("should get all disciplines", async () => {
    await request(app)
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

  test("should return a single discipline with specific id", async function () {
    await request(app)
      .get("/api/disciplines/" + savedDiscipline._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedDiscipline._id);
        expect(res.body.label).toBe(savedDiscipline.label);
        expect(res.body.icon).toBe(savedDiscipline.icon);
      });
  });

  test("should return 404 error when trying to retrieve non existing discipline (discipline not found with specific id)", async function () {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    await request(app)
      .get("/api/disciplines/" + randomMongoId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${randomMongoId}`
        );
      });
  });

  test("should return 404 error when trying to get a specific discipline with invalid mongoose id", async function () {
    invalidMongooseId = "123";
    await request(app)
      .get("/api/disciplines/" + invalidMongooseId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${invalidMongooseId}`
        );
      });
  });

  test("should update a discipline", async () => {
    const ToUpdateDiscipline = {
      label: "update disicpline",
      icon: "updateIcon",
    };
    await request(app)
      .put("/api/disciplines/" + savedDiscipline._id)
      .send(ToUpdateDiscipline)
      .expect(200)
      .then(async (res) => {
        expect(res.body._id).toBe(savedDiscipline._id.toString());
        expect(res.body.label).toBe(ToUpdateDiscipline.label);
        expect(res.body.icon).toBe(ToUpdateDiscipline.icon);
        savedDiscipline = res.body;
        const updatedDiscipline = await Discipline.findOne({
          _id: res.body._id,
        });
        expect(updatedDiscipline).toBeTruthy();
        expect(updatedDiscipline.label).toBe(savedDiscipline.label);
        expect(updatedDiscipline.icon).toBe(savedDiscipline.icon);
      });
  });

  test("should throw bad request error (400) when trying to update discipline with empty req body", async () => {
    await request(app)
      .put("/api/disciplines/" + savedDiscipline._id)
      .send()
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Discipline content can not be empty");
      });
  });

  test("should return 404 error when trying to update non existing discipline (discipline not found with specific id", async function () {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    const data = {
      label: "tennis",
      icon: "tennisIcon",
    };
    await request(app)
      .put("/api/disciplines/" + randomMongoId)
      .expect(404)
      .send(data)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${randomMongoId}`
        );
      });
  });

  test("should return 404 error when trying to update a specific discipline with invalid mongoose id", async function () {
    const data = {
      label: "tennis",
      icon: "tennisIcon",
    };

    await request(app)
      .put("/api/disciplines/" + invalidMongooseId)
      .expect(404)
      .send(data)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${invalidMongooseId}`
        );
      });
  });

  test("should return 404 error when trying to delete a specific discipline with invalid mongoose id", async function () {
    await request(app)
      .delete("/api/disciplines/" + invalidMongooseId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${invalidMongooseId}`
        );
      });
  });
  test("should return 404 error when trying to remove a non existing discipline", async function () {
    randomMongoId = new mongoose.Types.ObjectId().valueOf();
    await request(app)
      .delete("/api/disciplines/" + randomMongoId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          `Discipline not found with id ${randomMongoId}`
        );
      });
  });
  test("should delete discipline", async function () {
    await request(app)
      .delete("/api/disciplines/" + savedDiscipline._id)
      .expect(200)
      .then(async (res) => {
        expect(res.body.message).toBe("Discipline deleted successfully!");
      });
    const deletedDiscipline = await Discipline.findOne({
      _id: savedDiscipline._id,
    });
    expect(deletedDiscipline).toBeFalsy();
  });
});
