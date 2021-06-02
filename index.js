const { MessageEmbed, Collection, Client, Discord } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");
const fs = require("fs");
const client = new Client({
  disableEveryone: true,
});
require("discord-buttons")(client);
const mongoose = require("mongoose");

// PLEASE USE YOUR MONGODB CLUSTER! DONT USE MINE! YOU CAN CREATE IT IN MONGODB WEBSITE! PLEASE DONT USE MINE!!!
mongoose
  .connect(
    "mongodb+srv://exxylldb:exxyll-discord@exxylldb.apsj6.mongodb.net/Data",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(console.log("MongoDB : Connected to Google Cloud Server - Tokyo!"));

const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
  client.user.setActivity(`${prefix}help`);
  console.log(`${client.user.username} ✅`);
});

client.on("clickButton", async (button) => {
  if (button.id == "button1") {
    button.channel.send("Redirecting you to a Discord Invite Link...");
  } else if (button.id == "button2") {
    button.channel.send("Redirecting you to My Website Page...");
  } else if (button.id == "understand_button") {
    button.channel.send("Okay, sir!");
  }
  button.defer();
});

const distube = require("distube");
const player = new distube(client);

player.on("playSong", (message, queue, song) => {
  message.channel.send(`**${song.name}** has started playing.`);
});

client.player = player;

client.login(token);
