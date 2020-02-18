const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.listen(3000, () => console.log("Server has started"));
// app.use(express.json())

// require('dotenv').config()

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", error => console.error(error));
// db.once("open", () => console.log("Connected to Database"));

// const subscribersRouter = require("./routes/subscribers");
// app.use("/subscribers", subscribersRouter);
