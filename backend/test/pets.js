const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const mongoose = require("mongoose");

chai.use(chaiHttp);

describe("Pets", function () {
  let db;

  //connect to db
  this.beforeAll((done) => {
    mongoose.connect(process.env.mongMONGO_URI);
    //Keep the url same which you use to debug you local application
    db = mongoose.connection;
    db.on("error", console.error.bind(console, "Error connecting to DB"));
    db.once("open", () => {
      console.log("Connected DB".blue.bold);
      done();
    });
  });

  // test GET /pets
  describe("GET /pets", function () {
    it("should return an array of pets", function (done) {
      chai
        .request(server)
        .get("/pets")
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  // test GET /pets/id given a non-existent id
  describe("GET /pets/:id", function () {
    it("should return error", (done) => {
      chai
        .request(server)
        .get("/pets/1")
        .then((res) => {
          res.should.have.status(404);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  //test POST /create-pet to regiser a new pet
  describe("POST /create-pet", function () {
    it("should post a new pet", (done) => {
      let testPet = {
        name: "Spike",
        type: "Dog",
        race: "Test race",
        age: "1",
        weight: "5",
        city: "Campinas",
        owner: {},
      };
      chai
        .request(server)
        .post("/create-pet")
        .send(testPet)
        .then((res) => {
          res.should.have.status(201);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  //test POST /create-pet fails to regiser a new pet
  describe("POST /create-pet", function () {
    it("should NOT post a new pet without a name", (done) => {
      let testPet = {
        type: "Dog",
        race: "Test race",
        age: "1",
        weight: "5",
        city: "Campinas",
        owner: {},
      };
      chai
        .request(server)
        .post("/create-pet")
        .send(testPet)
        .then((res) => {
          res.should.have.status(400);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  describe("POST /create-pet", function () {
    it("should NOT post a new pet without a type", (done) => {
      let testPet = {
        name: "Spike",
        race: "Test race",
        age: "1",
        weight: "5",
        city: "Campinas",
        owner: {},
      };
      chai
        .request(server)
        .post("/create-pet")
        .send(testPet)
        .then((res) => {
          res.should.have.status(400);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  describe("POST /create-pet", function () {
    it("should NOT post a new pet without a race", (done) => {
      let testPet = {
        name: "Spike",
        type: "Dog",
        age: "1",
        weight: "5",
        city: "Campinas",
        owner: {},
      };
      chai
        .request(server)
        .post("/create-pet")
        .send(testPet)
        .then((res) => {
          res.should.have.status(400);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  describe("DELETE /pets/:id", function () {
    it("should delete a pet with its ID", (done) => {
      let id = "60a03d3ba36efc6e5841e14b";
      chai
        .request(server)
        .delete(`/pets/${id}`)
        .then((res) => {
          res.should.have.status(200);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  describe("UPDATE /pets/:id", function () {
    it("should delete a pet with its ID", (done) => {
      let id = "60a03dbd06136e6ea20d505e";
      let newAge = {
        age: "4",
      };
      chai
        .request(server)
        .put(`/pets/${id}`, newAge)
        .then((res) => {
          res.should.have.status(201);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });
});
