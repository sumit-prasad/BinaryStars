// ES Version: 6

require("dotenv").config();
const mongoose = require("mongoose");
function connectDB() {
    // Database Connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
        console.log("DB Connection Established.");
    });
}

module.exports = connectDB;
