const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB : Connected to Google Cloud Platform Service!"));
