const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Programme", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all programmes (empty programmes) ", async () => {
      await request(app)
        .get("/api/programme")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a programme empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/programmes")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Programme content can not be empty");
      });
  });
  test("should add a programme", async () => {
    const data = {
      title: "programme test",
      description: "programme test",
      image : "",
      videoLink : "http://127.0.0.1:5000/hicotech"
    };
    await request(app)
      .post("/api/programmes")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.title).toBe(data.title);
        expect(response.body.description).toBe(data.description);
        expect(response.body.image).toBe(data.image);
        expect(response.body.videoLink).toBe(data.videoLink);
        savedProgramme = response.body;
      });
  });

  test("should get all programmes", () => {
    request(app)
      .get("/api/programmes")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedProgramme._id);
        expect(res.body[0].title).toBe(savedProgramme.title);
        expect(res.body[0].description).toBe(savedProgramme.description);
      });
  });

  test("should return a single programme", async function () {
    await request(app)
      .get("/api/programmes/" + savedProgramme._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedProgramme._id);
        expect(res.body.title).toBe(savedProgramme.title);
        expect(res.body.description).toBe(savedProgramme.description);
      });
      
  });

  test("should not update a programme empty", async () => {
    const data = {
     
    };
    await request(app)
      .put("/api/programmes/" + savedProgramme._id)
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Programme content can not be empty");
      });
  });
  
  test("should update a programme", async () => {
    const data = {
      title: "programme put test",
      description: "programme put  test",
      image : "",
      videoLink : "http://127.0.0.1:5000/hicotech"
    };
    await request(app)
      .put("/api/programmes/" + savedProgramme._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedProgramme._id);
        expect(res.body.title).toBe(data.title);
        expect(res.body.description).toBe(data.description);
      });
  });

  test("should delete programme using its id",async()=>{
    await request(app)
      .delete("/api/programmes/"+savedProgramme._id)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Programme deleted successfully!");
      })
  });

  

  test("should return 404 when the id doesn't exist",async function(){
    await request(app)
      .get("/api/programmes/"+savedProgramme._id)
      .expect(404)
      .then((response)=>{
        expect(response.body.message).toBe("Programme not found with id "+savedProgramme._id)
      })
  })

  test("should return 404 when the id doesn't exist in delete",async function(){
      await request(app)
        .delete("/api/programmes/"+savedProgramme._id)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Programme not found with id "+savedProgramme._id)
        })
  })
    
  test("should return 404 when the id doesn't exist in delete",async function(){
    const data = {
      title: "programme put test",
      description: "programme put  test",
      image : "",
      videoLink : "http://127.0.0.1:5000/hicotech"
    };
      await request(app)
        .put("/api/programmes/"+savedProgramme._id)
        .send(data)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Programme not found with id "+savedProgramme._id)
      })
    })
  
    


});
