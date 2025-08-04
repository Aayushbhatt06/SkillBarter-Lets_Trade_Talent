const mongoose = require('mongoose');
main().catch(err => console.log(err));
const mongo_url = process.env.MONGO_CONN;
async function main() {
  await mongoose.connect("mongodb://localhost:27017/SkillBarter")
  .then(console.log("Connected to Mongo db"))

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}