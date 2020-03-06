require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// IMPORT ROUTES
const userRoutes = require("./api/routes/users");
const spotRoutes = require("./api/routes/spots");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

// Log when connection is successful
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Database"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (request.method === "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return response.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/spots", spotRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found yea");
  error.status = 404;
  next(error);
});

app.use("/users", userRoutes);
app.use((request, response, next) => {
  const error = new Error("Not found here");

  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
