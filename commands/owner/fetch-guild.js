const { Client, Message, MessageEmbed } = require("discord.js");
const owner_id = require("../../config.json").owner_id;

module.exports = {
  name: "fetch-guild",
  aliases: ["list-server"],
  usage: "",
  description: "Fetch and Get List of Server",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== owner_id) return;
    const guild = client.guilds.cache.map((guild) => guild.name);
    message.lineReply(`List of Server\n\n` + guild.join("\n"), {
      code: "yaml",
    });
  },
};
