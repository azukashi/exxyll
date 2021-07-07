const { MessageEmbed, Collection, Client, Discord } = require("discord.js");
require("discord-reply");
const translate = require("@k3rn31p4nic/google-translate-api");
const { DiscordTogether } = require("discord-together");
const fs = require("fs");
const client = new Client({
  disableEveryone: true,
});
require("discord-buttons")(client);
const mongoose = require("mongoose");
const mongouri = require("./config.json").mongoURI;
mongoose
  .connect(mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB : Connected to Google Cloud Server - Tokyo!"));

const prefixSchema = require("./models/prefix");
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
/**
 * @param {Client} client
 */

client.prefix = async function (message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch((err) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};

client.on("clickButton", async (button) => {
  if (button.id == "button1") {
    button.channel.send("Here is the Link!\n\nhttps://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=3757567094&scope=bot");
  } else if (button.id == "button2") {
    button.channel.send("Here is the Link!\n\nhttps://exxyll.github.io");
  } else if (button.id == "understand_button") {
    button.channel.send("Okay, sir!");
  }
  button.defer();
});

client.on("guildDelete", async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log(`Deleted data.`));
    }
  });
});

const distube = require("distube");
const player = new distube(client);

player
  .on("playSong", (message, queue, song) => {
    message.lineReplyNoMention(`**${song.name}** has started playing.`);
  })
  .on("addList", (message, queue, playlist) => {
    message.channel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`);
  })
  .on("empty", (message) => {
    message.channel.send("Channel is empty. Leaving the channel");
  })
  .on("error", (message, error) => {
    message.channel.send(`An error occured + ${error}`);
  })
  .on("finish", (message) => {
    message.channel.send("No more song in queue");
  })
  .on("noRelated", (message) => {
    message.channel.send(`Can't find related video to play. Stop playing music.`);
  })
  .on("playList", (message, queue, playlist, song) =>
    message.channel.send(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
  )
  .on("searchCancel", (message) => message.channel.send(`Searching canceled.`))
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**Choose an option from below**\n${result.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
  });

client.player = player;
client.discordTogether = new DiscordTogether(client);

client.login(token);
