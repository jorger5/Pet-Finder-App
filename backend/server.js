const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
let cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config({ path: "./config/config.env" });

connectDB();

//Import endpoint's routers
const petRoute = require("./routes/pets");
const ownerRoute = require("./routes/owners");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.owner = undefined;
        req.owner = decode;
        next();
      }
    );
  } else {
    req.owner = undefined;
    next();
  }
});
//Endpoints
app.use("/", petRoute);
app.use("/", ownerRoute);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
module.exports = app;
