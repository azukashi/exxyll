const client = require("../index");

client.on("ready", () => {
  console.log(`${client.user.username} has logged on!`);
});
