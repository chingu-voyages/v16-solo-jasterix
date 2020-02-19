require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.listen(3000, () => console.log("Server has started"));

// Lets server accept json
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
// const db = mongoose.connection;

db.once("open", () => console.log("Connected to Database"));
// db.once("open", () => console.log("Connected to Database"));

// db.on("error", console.error(error));
db.on("error", error => console.error(error));

// const subscribersRouter = require("./routes/subscribers");
// app.use("/subscribers", subscribersRouter);
