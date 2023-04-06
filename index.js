// dependencies
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// create app
const app = express();

// config dotenv
dotenv.config();

// define port
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// db connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    // New Url Parser to handle more edge cases and improve robustness
    useNewUrlParser: true,
    // enable new server discovery and monitoring engine in the driver to provide better performance
    useUnifiedTopology: true,
    // Comunicate with this database with the client object
    dbName: "Chat_Application",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(port, () => {
  console.log("Chat Application is running on port:", port);
});

module.exports = app;
