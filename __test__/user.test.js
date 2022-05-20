const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("User", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all users (empty users) ", async () => {
      await request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a user empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/users")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("User content can not be empty");
      });
  });
  test("should add a user", async () => {
    const data = {
        firstName: "firstname test",
        lastName: "lastname test",
        email : "test@gmail.com",
        role : "joueur",
        password :"12345678",
        sexe: "Homme",
    };
    await request(app)
      .post("/api/users")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.firstName).toBe(data.firstName);
        expect(response.body.lastName).toBe(data.lastName);
        expect(response.body.role).toBe(data.role);
        expect(response.body.sexe).toBe(data.sexe);
        savedUser = response.body;
      });
  });

  test("should get all users", () => {
    request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedUser._id);
        expect(res.body[0].email).toBe(savedUser.email);
      });
  });

  test("should return a single user", async function () {
    await request(app)
      .get("/api/users/" + savedUser._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedUser._id);
        expect(res.body.email).toBe(savedUser.email);
      });
      
  });

  test("should not update a user empty", async () => {
    const data = {
        
    };
    await request(app)
      .put("/api/users/" + savedUser._id)
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("User content can not be empty");
      });
  });

  test("should delete user using its id",async()=>{
    await request(app)
      .delete("/api/users/"+savedUser._id)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("User deleted successfully!");
      })
  });

  

  test("should return 404 when the id doesn't exist",async function(){
    await request(app)
      .get("/api/users/"+savedUser._id)
      .expect(404)
      .then((response)=>{
        expect(response.body.message).toBe("User not found with id "+savedUser._id)
      })
  })

  test("should return 404 when the id doesn't exist in delete",async function(){
      await request(app)
        .delete("/api/users/"+savedUser._id)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("User not found with id "+savedUser._id)
        })
  })
    
  test("should return 404 when the id doesn't exist in delete",async function(){
    const data = {
        firstName: "firstName update test",
        lastName: "lastName update test",
    };
      await request(app)
        .put("/api/users/"+savedUser._id)
        .send(data)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("User not found with id "+savedUser._id)
    })
})
  
    


});
