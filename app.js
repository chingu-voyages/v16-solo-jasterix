require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// IMPORT ROUTES
const spotRoutes = require("./api/routes/spots");
const userRoutes = requiee("api/routes/users");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

// Log when connection is successful
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Database"));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
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
  const error = new Error("Not found");
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
