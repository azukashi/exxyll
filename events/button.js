const client = require("../index.js");

client.on("clickButton", async (button) => {
  if (button.id == "button1") {
    button.channel.send(
      "Here is the Link!\n\nhttps://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=3757567094&scope=bot"
    );
  } else if (button.id == "button2") {
    button.channel.send("Here is the Link!\n\nhttps://exxyll.github.io");
  } else if (button.id == "understand_button") {
    button.channel.send("Okay, sir!");
  }
  button.defer();
});
