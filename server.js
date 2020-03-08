const http = require("http");
const app = require("./app");
const seedusers = require("./seeds/userSeed.js");
const seedSpot = require("./seeds/spotSeed.js");
const path = require("path");

// serve static asssets when in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
}

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

module.exports = app;
