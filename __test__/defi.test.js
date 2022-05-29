const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Defi", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all defis (empty defis) ", async () => {
      await request(app)
        .get("/api/defis")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a defi empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/defis")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Defi content can not be empty");
      });
  });
  test("should add a defi", async () => {
    const data = {
      defiName: "defi test",
      defiObjectif: "defi test",
      defiLien : "http://127.0.0.1:5000/hicotech"
    };
    await request(app)
      .post("/api/defis")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.defiName).toBe(data.defiName);
        expect(response.body.defiObjectif).toBe(data.defiObjectif);
        expect(response.body.defiLien).toBe(data.defiLien);
        
        savedDefi = response.body;
      });
  });

  test("should get all defis", () => {
    request(app)
      .get("/api/defis")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedDefi._id);
        expect(res.body[0].defiName).toBe(savedDefi.defiName);
        expect(res.body[0].defiObjectif).toBe(savedDefi.defiObjectif);
      });
  });

  test("should return a single defi", async function () {
    await request(app)
      .get("/api/defis/" + savedDefi._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedDefi._id);
        expect(res.body.defiName).toBe(savedDefi.defiName);
        expect(res.body.defiObjectif).toBe(savedDefi.defiObjectif);
      });
      
  });

  test("should not update a defi empty", async () => {
    const data = {
     
    };
    await request(app)
      .put("/api/defis/" + savedDefi._id)
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Defi content can not be empty");
      });
  });
  
  test("should update a defi", async () => {
    const data = {
      defiName: "defi put test",
      defiObjectif: "defi put  test",
      defiLien : "http://127.0.0.1:5000/hicotech"
    };
    await request(app)
      .put("/api/defis/" + savedDefi._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedDefi._id);
        expect(res.body.defiName).toBe(data.defiName);
        expect(res.body.defiObjectif).toBe(data.defiObjectif);
      });
  });

  test("should delete defi using its id",async()=>{
    await request(app)
      .delete("/api/defis/"+savedDefi._id)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Defi deleted successfully!");
      })
  });

  

  test("should return 404 when the id doesn't exist",async function(){
    await request(app)
      .get("/api/defis/"+savedDefi._id)
      .expect(404)
      .then((response)=>{
        expect(response.body.message).toBe("Defi not found with id "+savedDefi._id)
      })
  })

  test("should return 404 when the id doesn't exist in delete",async function(){
      await request(app)
        .delete("/api/defis/"+savedDefi._id)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Defi not found with id "+savedDefi._id)
        })
  })
    
  test("should return 404 when the id doesn't exist in delete",async function(){
    const data = {
      defiName: "defi put test",
      defiObjectif: "defi put  test",
      image : "",
      videoLink : "http://127.0.0.1:5000/hicotech"
    };
      await request(app)
        .put("/api/defis/"+savedDefi._id)
        .send(data)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Defi not found with id "+savedDefi._id)
      })
    })  

});
