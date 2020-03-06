const http = require("http");
const app = require("./app");
const seedusers = require("./seeds/userSeed.js");
const seedSpot = require("./seeds/spotSeed.js");


const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

module.exports = app;
