const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Invitation", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all invitations (empty invitations) ", async () => {
      await request(app)
        .get("/api/invitations")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a invitation empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/invitations")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Invitation content can not be empty");
      });
  });
  
  test("should get all invitations", () => {
    request(app)
      .get("/api/invitations")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(0);
      });
  });

  test("should not update a invitation empty", async () => {
    const data = {
     
    };
    await request(app)
      .put("/api/invitations/" + "012354687")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Invitation content can not be empty");
      });
  });
  

  test("should return 404 when the id doesn't exist",async function(){
    await request(app)
      .get("/api/invitations/"+ "012354687")
      .expect(404)
      .then((response)=>{
        expect(response.body.message).toBe("Invitation not found with id "+ "012354687")
      })
  })

  test("should return 404 when the id doesn't exist in delete",async function(){
      await request(app)
        .delete("/api/invitations/"+ "012354687" ) 
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Invitation not found with id "+ "012354687")
        })
  })
    
  test("should return 404 when the id doesn't exist in update",async function(){
    const data = {
        etat: "annulé",
        expired : true
    };
      await request(app)
        .put("/api/invitations/"+"012354687")
        .send(data)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Invitation not found with id "+"012354687")
      })
    })
  
    


});
