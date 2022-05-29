const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Skill", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all skills by discipline (empty skills) ", async () => {
      await request(app)
        .get("/api/all/skills/6231bf886725280bf7288f05")
        .expect(200)
        .then((res) => {
          expect(typeof res.body === "object").toBeTruthy();
          expect(Array.isArray(res.body.skill)).toBeTruthy();
          expect(res.body.skill.length).toEqual(0);
        });
    });
  test("should add a skill", async () => {
    const data = {
      skillName: "test5",
      description: "Cette Compétence permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .post("/api/createSkill")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.data.skillName).toBe(data.skillName);
        expect(response.body.data.description).toBe(data.description);
        expect(response.body.data.lien).toBe(data.lien);
        expect(response.body.data.max).toBe(data.max);
        expect(response.body.data.nbreFois).toBe(data.nbreFois);
        expect(response.body.data.alerted).toBe(data.alerted);

        savedSkill = response.body;
      });
  });
  test("should through an error while adding a skill (missing attribute)", async () => {
    const data = {
      description: "Cette Compétence permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .post("/api/createSkill")
      .send(data)
      .expect(500)
      .then(async (response) => {
        expect(response.body.message).toBe(
          "Enter tous les champs de compétence"
        );
      });
  });

  test("should return an error while adding a new skill (req.body is empty)", async () => {
    const data = {};
    await request(app)
      .post("/api/createSkill")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.message).toBe("Les champs ne peut pas être vide");
      });
  });

  test("should get all skills by discipline", () => {
    request(app)
      .get("/api/all/skills/" + savedSkill.data.discipline)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.skill)).toBeTruthy();
        expect(res.body.skill.length).toEqual(1);
        expect(res.body.skill[0].skillName).toBe(savedSkill.data.skillName);
        expect(res.body.skill[0].description).toBe(savedSkill.data.description);
        expect(res.body.skill[0].lien).toBe(savedSkill.data.lien);
        expect(res.body.skill[0].max).toBe(savedSkill.data.max);
        expect(res.body.skill[0].nbreFois).toBe(savedSkill.data.nbreFois);
        expect(res.body.skill[0].alerted).toBe(savedSkill.data.alerted);
      });
  });

  test("should return a single skill", async function () {
    await request(app)
      .get("/api/skill/" + savedSkill.data._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedSkill.data._id);
        expect(res.body.skillName).toBe(savedSkill.data.skillName);
        expect(res.body.description).toBe(savedSkill.data.description);
        expect(res.body.lien).toBe(savedSkill.data.lien);
        expect(res.body.max).toBe(savedSkill.data.max);
        expect(res.body.nbreFois).toBe(savedSkill.data.nbreFois);
        expect(res.body.alerted).toBe(savedSkill.data.alerted);
      });
  });
  test("should return an error while retrieving a skill (invalid key) ", async function () {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .get("/api/skill/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          "compétence non trouvée avec l'id " + wrongId
        );
      });
  });

  test("should update a skill", async () => {
    const data = {
      skillName: "test5",
      description: "Cette compétence permet de mesurer me test4 d'un joueur",
      lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
      max: true,
      nbreFois: 2,
      alerted: true,
      discipline: "6231bf886725280bf7288f05",
    };
    await request(app)
      .put("/api/skill/" + savedSkill.data._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.skill.skillName).toBe(data.skillName);
        expect(res.body.skill.description).toBe(data.description);
        expect(res.body.skill.lien).toBe(data.lien);
        expect(res.body.skill.max).toBe(data.max);
        expect(res.body.skill.nbreFois).toBe(data.nbreFois);
        expect(res.body.skill.alerted).toBe(data.alerted);
      });
  });
  test("should generate an error while updating a single skill (empty object)", async () => {
    const data = {};
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .put("/api/skill/" + wrongId)
      .send(data)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Les champs de contenu des compétences ne peut pas être vide"
        );
      });
  });

  test("should delete a single skill by id", async () => {
    await request(app)
      .delete("/api/skill/" + savedSkill.data._id)

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("compétence supprimé avec succès !");
      });
  });
  test("should through an  error when deleting a single skill (invalid key) ", async () => {
    wrongId = "6231bf786725280bf7288f04";
    await request(app)
      .delete("/api/skill/" + wrongId)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe(
          "compétence non trouvée avec id " + wrongId
        );
      });
  });
});
