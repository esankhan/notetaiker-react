const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    console.log("MongoDB has Connected");
  } catch (err) {
    console.log("ERRRRRRRRRRR=>" + err.message);
    process.exit(1);
  }
};
console.log(connectDB);
module.exports = connectDB;
