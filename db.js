require("dotenv").config();
const mongoose = require("mongoose");
var User = require("./models/user");

const DB_URL = process.env.MONGO_URL

const dbConnect = function () {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error: "));
  return mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  });
};

// var testUser = new User({
//     _id: new mongoose.Types.ObjectId(),
//     username: "test@test.com",
//     password: "1234",
//     role: "USER"
// });

// testUser.save(function(err) {
//   if (err) throw err;

//   console.log("User successfully created: ");
//   console.log(testUser)
// });

// var adminUser = new User({
//   _id: new mongoose.Types.ObjectId(),
//   username: "admin@admin.com",
//   password: "admin",
//   role: "ADMIN"
// });

// adminUser.save(function(err) {
// if (err) throw err;

// console.log("User successfully created: ");
// console.log(adminUser)
// });

// User.find().then(response => {
//   for (user of response) {
//     if (!user.isTestUser) {
//       user.isTestUser = false
//       user.save()
//       console.log("User: ", user)
//     }
//   }
// })

module.exports = dbConnect;