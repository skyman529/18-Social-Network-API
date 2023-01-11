const connection = require('../config/connection');
const { user, thoughts, reactions } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await user.deleteMany({});
  await thoughts.deleteMany({});
  // Drop existing thoughts
  await thoughts.deleteMany({});


  // Add students to the collection and await the results
  await user.insertMany([
    { name: "skylar_martin", email: "user1@gmail.com" },
    { name: "natalie_ayrton", email: "user2@gmail.com" },
    { name: "colorado_guy", email: "user3@gmail.com" },
    { name: "cleavland_cutter", email: "user4@gmail.com" },
  ]).then((user, err) => {
    if (err) throw err;
    console.log("users data has been inserted.");
  });
 
  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
