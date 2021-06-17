const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const owner = config.owner_id;
const color = "GREEN";

module.exports = {
  name: "restart",
  aliases: ["sh-restart"],
  usage: "",
  description: "Restart the client",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== owner) return;
    await message.channel.send(
      ` **Bot restarted...**\n• Loaded \`${client.commands.size}\` commands`
    );

    const masterLogger = client.channels.cache.get("855151075287498792");
    if (masterLogger) {
      await masterLogger.send({
        embed: {
          title: "Client Restarted",
          description: ["**Actioned by:**", `\`${message.author.tag}\``].join(
            "\n"
          ),
          color: color,
        },
      });
    }

    return process.exit();
  },
};
