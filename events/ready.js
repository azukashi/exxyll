const client = require("../index");
const prefix = require("../config.json").prefix;

client.on("ready", async () => {
  client.user.setActivity(
    `${prefix}help | Live at ${client.guilds.cache.size} Servers`,
    {
      type: "STREAMING",
      url: "https://www.twitch.tv/falcxxr",
    }
  );

  console.log(`${client.user.username} is up and ready to go!`);
});
