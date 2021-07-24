const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB : Connected to Google Cloud Platform Service!"));
