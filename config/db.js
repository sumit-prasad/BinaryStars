// ES Version: 6

require("dotenv").config();
const mongoose = require("mongoose");

// Set up Mongoose
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose.connection;
