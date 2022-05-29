const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Statistique", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all statistics by discipline (empty statistics) ", async () => {
      await request(app)
        .get("/api/all/statistics/6231bf786725280bf7288f01")
        .expect(200)
        .then((res) => {
          expect(typeof res.body === "object").toBeTruthy();
          expect(Array.isArray(res.body.statistic)).toBeTruthy();
          expect(res.body.statistic.length).toEqual(0);
        });
    });
  test("should add a statistic", async () => {
    const data = {
      statisticName: "test5",
      statisticType: "compteur",
      unit: "ml/h",
      description: "Cette statistique permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .post("/api/createStatistic")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.data.statisticName).toBe(data.statisticName);
        expect(response.body.data.statisticType).toBe(data.statisticType);
        expect(response.body.data.unit).toBe(data.unit);
        expect(response.body.data.description).toBe(data.description);
        expect(response.body.data.lien).toBe(data.lien);
        expect(response.body.data.max).toBe(data.max);
        expect(response.body.data.nbreFois).toBe(data.nbreFois);
        expect(response.body.data.alerted).toBe(data.alerted);
        expect(response.body.data.discipline).toBe(data.discipline);

        savedStatistic = response.body;
      });
  });
  test("should through an error while adding a statistic (missing attribute)", async () => {
    const data = {
      statisticType: "compteur",
      unit: "ml/h",
      description: "Cette statistique permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .post("/api/createStatistic")
      .send(data)
      .expect(500)
      .then(async (response) => {
        expect(response.body.message).toBe(
          "Enter tous les champs de statistique"
        );
      });
  });
  test("should return an error while adding a new statistic (req.body is empty)", async () => {
    const data = {};
    await request(app)
      .post("/api/createStatistic")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.message).toBe("Les champs ne peut pas être vide");
      });
  });

  test("should get all statistics by discipline", () => {
    request(app)
      .get("/api/all/statistics/" + savedStatistic.data.discipline)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.statistic)).toBeTruthy();
        expect(res.body.statistic.length).toEqual(1);
        expect(res.body.statistic[0].statisticName).toBe(
          savedStatistic.data.statisticName
        );
        expect(res.body.statistic[0].statisticType).toBe(
          savedStatistic.data.statisticType
        );
        expect(res.body.statistic[0].unit).toBe(savedStatistic.data.unit);
        expect(res.body.statistic[0].description).toBe(
          savedStatistic.data.description
        );
        expect(res.body.statistic[0].lien).toBe(savedStatistic.data.lien);
        expect(res.body.statistic[0].max).toBe(savedStatistic.data.max);
        expect(res.body.statistic[0].nbreFois).toBe(
          savedStatistic.data.nbreFois
        );
        expect(res.body.statistic[0].alerted).toBe(savedStatistic.data.alerted);
        expect(res.body.statistic[0].discipline).toBe(
          savedStatistic.data.discipline
        );
      });
  });

  test("should return a single statistic", async function () {
    await request(app)
      .get("/api/statistic/" + savedStatistic.data._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedStatistic.data._id);
        expect(res.body.statisticType).toBe(savedStatistic.data.statisticType);
        expect(res.body.unit).toBe(savedStatistic.data.unit);
        expect(res.body.description).toBe(savedStatistic.data.description);
        expect(res.body.lien).toBe(savedStatistic.data.lien);
        expect(res.body.max).toBe(savedStatistic.data.max);
        expect(res.body.nbreFois).toBe(savedStatistic.data.nbreFois);
        expect(res.body.alerted).toBe(savedStatistic.data.alerted);
        expect(res.body.discipline).toBe(savedStatistic.data.discipline);
      });
  });
  test("should return an error while retrieving a single statistic (invalid key) ", async function () {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .get("/api/statistic/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          "statistique non trouvée avec l'id " + wrongId
        );
      });
  });

  test("should update a statistic", async () => {
    const data = {
      statisticName: "test6",
      statisticType: "compteur",
      unit: "km/h",
      description: "Cette statistique permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .put("/api/statistic/" + savedStatistic.data._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.stat._id).toBe(savedStatistic.data._id);
        expect(res.body.stat.statisticType).toBe(data.statisticType);
        expect(res.body.stat.unit).toBe(data.unit);
        expect(res.body.stat.description).toBe(data.description);
        expect(res.body.stat.lien).toBe(data.lien);
        expect(res.body.stat.max).toBe(data.max);
        expect(res.body.stat.nbreFois).toBe(data.nbreFois);
        expect(res.body.stat.alerted).toBe(data.alerted);
        expect(res.body.stat.discipline).toBe(data.discipline);
      });
  });
  test("should generate an error while updating a single statistic (empty object)", async () => {
    const data = {};
    await request(app)
      .put("/api/statistic/" + savedStatistic.data._id)
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Les champs de contenu des statistiques ne peut pas être vide"
        );
      });
  });
  test("should generate an error while updating a single statistic (empty object)", async () => {
    const data = {};
    await request(app)
      .put("/api/statistic/" + savedStatistic.data._id)
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Les champs de contenu des statistiques ne peut pas être vide"
        );
      });
  });
  test("should delete a single statistic by id", async () => {
    await request(app)
      .delete("/api/statistic/" + savedStatistic.data._id)

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Statistique supprimé avec succès !");
      });
  });
  test("should through an  error when deleting a single statistic (invalid key) ", async () => {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .delete("/api/statistic/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          "Statistique non trouvée avec id " + wrongId
        );
      });
  });
});
