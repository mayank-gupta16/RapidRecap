// Function to generate 100 fake users
const { faker } = require("@faker-js/faker");
const User = require("../../model/userSchema"); // Import User model
const { progressBar } = require("../../utils/progress"); // Import progressBar utility function
async function generateFakeUsers() {
  const updateProgress = progressBar(100);
  const fakeUsers = [];
  for (let i = 0; i < 100; i++) {
    const fakeUser = new User({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `dummy${i}@mail.com`,
      phone: "9876543210",
      password: "12345678",
      verified: true,
      pic: "https://via.placeholder.com/150",
      bio: faker.lorem.sentences(),
      inGameName: "dummy" + i,
    });
    await fakeUser.save();
    fakeUsers.push(fakeUser);
    updateProgress();
  }
  return fakeUsers;
}

module.exports = generateFakeUsers;
