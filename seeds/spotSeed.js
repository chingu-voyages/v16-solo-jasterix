const faker = require("faker");
const mongoose = require("mongoose");
const Spot = require("../api/models/spot.js");

const seedSpots = async () => {
  try {
    const quantity = 10;
    const spots = [];
    for (let s = 0; s < quantity; s++) {
      spots.push(
        new Spot({
          name: faker.company.companyName(),
          spotType: "food",
          website: faker.internet.url(),
          coverImageUrl: faker.image.imageUrl(),
          addressNumber: faker.random.number(),
          addressStreet: faker.address.streetName(),
          addressCity: faker.address.city(),
          addressState: faker.address.state(),
          addressZipcode: faker.address.zipCode()
        })
      );
    }
    console.log(spots);
  } catch (error) {
    console.log(error);
  }
};

seedSpots();
