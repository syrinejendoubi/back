const request = require("supertest");
const { createServer } = require("../utils/serverUtils");
const mongoose = require("mongoose");
const app = createServer();
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Event", () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }),
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    }),
    test("should get all events (empty events) ", async () => {
      await request(app)
        .get("/api/events")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });
  test("should not add a event empty", async () => {
    const data = {
     
    };
    await request(app)
      .post("/api/events")
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Event content can not be empty");
      });
  });
  test("should add a event", async () => {
  
    const data = {
      title: "event test",
      description: "event test",
      image : "",
      etat:"Pour Tous",
     
    };
    await request(app)
      .post("/api/events")
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.title).toBe(data.title);
        expect(response.body.description).toBe(data.description);
        expect(response.body.image).toBe(data.image);
        expect(response.body.etat).toBe(data.etat);
   
        savedEvent = response.body;
      });
  });

  test("should get all events", () => {
    request(app)
      .get("/api/events")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0]._id).toBe(savedEvent._id);
        expect(res.body[0].title).toBe(savedEvent.title);
        expect(res.body[0].description).toBe(savedEvent.description);
      });
  });

  test("should return a single event", async function () {
    await request(app)
      .get("/api/events/" + savedEvent._id)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedEvent._id);
        expect(res.body.title).toBe(savedEvent.title);
        expect(res.body.description).toBe(savedEvent.description);
      });
      
  });

  test("should not update a event empty", async () => {
    const data = {
     
    };
    await request(app)
      .put("/api/events/" + savedEvent._id)
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.message).toBe("Event content can not be empty");
      });
  });
  
  test("should update a event", async () => {
    const data = {
      title: "event put test",
      description: "event put  test",
      etat:"Mes Joueurs",
     
    };
    await request(app)
      .put("/api/events/" + savedEvent._id)
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(savedEvent._id);
        expect(res.body.title).toBe(data.title);
        expect(res.body.description).toBe(data.description);
      });
  });

  test("should delete event using its id",async()=>{
    await request(app)
      .delete("/api/events/"+savedEvent._id)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Event deleted successfully!");
      })
  });

  

  test("should return 404 when the id doesn't exist",async function(){
    await request(app)
      .get("/api/events/"+savedEvent._id)
      .expect(404)
      .then((response)=>{
        expect(response.body.message).toBe("Event not found with id "+savedEvent._id)
      })
  })

  test("should return 404 when the id doesn't exist in delete",async function(){
      await request(app)
        .delete("/api/events/"+savedEvent._id)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Event not found with id "+savedEvent._id)
        })
  })
    
  test("should return 404 when the id doesn't exist in delete",async function(){
    const data = {
      title: "event put test",
      description: "event put  test",
      etat:"Mes Joueurs",
  
    };
      await request(app)
        .put("/api/events/"+savedEvent._id)
        .send(data)
        .expect(404)
        .then((response)=>{
          expect(response.body.message).toBe("Event not found with id "+savedEvent._id)
      })
    })

});
