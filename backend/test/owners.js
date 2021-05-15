const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

const mongoose = require("mongoose");

chai.use(chaiHttp);

describe("Owners", function () {
  let db;
  let token = "";
  let id = "609ef5d03763eb46abb9047b";
  let testUser = {
    name: "nain",
    email: "nain@gmail.com",
    password: "hola1234",
    address: "Avenida Maravilhas",
    city: "Campinas",
  };
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

  // test LOGIN
  describe("POST /sign_in", function () {
    it("should login and return a token", function (done) {
      chai
        .request(server)
        .post("/sign_in")
        .send({ email: "jorge@gmail.com", password: "hola1234" })
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.user.should.have.property("token");
          token = `JWT ${res.body.user.token}`;
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
    it("should fail because nothing was sent", function (done) {
      chai
        .request(server)
        .post("/sign_in")
        .send({})
        .then((res) => {
          res.should.have.status(401);
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
    it("should fail because wrong password ", function (done) {
      chai
        .request(server)
        .post("/sign_in")
        .send({ email: "jorge@gmail.com", password: "asd" })
        .then((res) => {
          res.should.have.status(401);
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
  });

  // test GET /owners
  describe("GET /owners", function () {
    it("should return an array of owners, only with authorization", function (done) {
      chai
        .request(server)
        .get("/owners")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
    it("should fail because no authorization", function (done) {
      chai
        .request(server)
        .get("/owners")
        .set("Authorization", "")
        .then((res) => {
          res.should.have.status(401);
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
  });

  // test POST /register
  describe("POST /register", function () {
    it("should create a new owner", function (done) {
      chai
        .request(server)
        .post("/register")
        .send(testUser)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          done();
        })
        .catch((error) => {
          console.log(testUser);
          console.log(error);
          throw error;
        });
    });
    it("should not create a duplicated user based on email address", function (done) {
      chai
        .request(server)
        .post("/register")
        .send(testUser)
        .then((res) => {
          res.should.have.status(400);
          res.body.message.keyValue.should.have.a.property(
            "email",
            testUser.email
          );
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
  });

  describe("GET /owners/:id/pets", function () {
    it("should return an array of pets", function (done) {
      chai
        .request(server)
        .get(`/owners/${id}/pets`)
        .then((res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    });
    it("should NOT return an array of pets with wrong ID", function (done) {
      chai
        .request(server)
        .get(`/owners/123/pets`)
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

  describe("DELETE /owners/:id", function () {
    it("should delete an owner with its ID and being an authorized user", (done) => {
      let id = "60a03d3ba36efc6e5841e14b";
      chai
        .request(server)
        .delete(`/owners/${id}`)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
    it("should NOT delete an owner with its ID and being an unauthorized user", (done) => {
      let id = "60a04521582e4a720370d164";
      chai
        .request(server)
        .delete(`/owners/${id}`)
        .set("Authorization", "123")
        .then((res) => {
          res.should.have.status(401);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });

  describe("PUT /owners/:id", function () {
    it("should update an owner with its ID and being an authorized user", (done) => {
      let id = "60a04521582e4a720370d164";
      chai
        .request(server)
        .put(`/owners/${id}`)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(201);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
    it("should NOT update an owner with its ID and being an unauthorized user", (done) => {
      let id = "60a04521582e4a720370d164";
      chai
        .request(server)
        .put(`/owners/${id}`)
        .set("Authorization", "123")
        .then((res) => {
          res.should.have.status(401);
          done();
        })
        .catch((error) => {
          console.log(error);

          throw error;
        });
    });
  });
});
