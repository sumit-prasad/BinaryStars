// Requirements
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;

// Express config
const app = express();
app.set('view engine', 'ejs');

/*DB Connection*/
const connectDB = require("./config/db");
connectDB();


/*Routes*/
// Index
app.use("/", require("./routes/index"));


/*Server connection*/
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

