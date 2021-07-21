const mongoose = require("mongoose");
const mongouri = require("../config.json").mongoURI;
mongoose
  .connect(mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB : Connected to Google Cloud Server - Tokyo!"));