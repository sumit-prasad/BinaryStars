// ES Version: 6

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  // Database Connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("DB Connection Established.");
  });
};

module.exports = connectDB;
