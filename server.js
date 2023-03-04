// Requirements
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;

// Express configuration
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

/*DB Connection*/
const connectDB = require("./config/db");
connectDB();

/*Routes*/

// Home
app.use("/", require("./routes/index"));

/*Server connection*/
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
