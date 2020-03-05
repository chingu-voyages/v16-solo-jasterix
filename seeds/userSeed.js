const faker = require("faker");
const mongoose = require("mongoose");
const User = require("../api/models/user.js");

const userSeed = async () => {
  try {
    const quantity = 10;
    const users = [];
    for (let u = 0; u < quantity; u++) {
      users.push(
        new User({
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
      );
    }
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};

userSeed();
module.exports = userSeed;
