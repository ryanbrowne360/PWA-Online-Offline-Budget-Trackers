// require('dotenv').config() added
require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//changed const PORT = 3000; to const PORT = 3000;
const PORT = process.env.PORT || 3000

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

//modified from original pathway and object params
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


