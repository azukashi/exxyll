const client = require("../index");
const prefix = require("../config.json").prefix;
const chalk = require("chalk");

client.on("ready", async () => {
  client.user.setActivity(
    `${prefix}help | Live at ${client.guilds.cache.size} Servers`,
    {
      type: "STREAMING",
      url: "https://www.twitch.tv/falcxxr",
    }
  );

  console.log(
    `${chalk.blueBright.bold(client.user.username)}${chalk.white.bold(
      " is up and ready to go!"
    )}`
  );
  console.log(`Client Websocket Ping is : ${client.ws.ping} ms!`);
});
