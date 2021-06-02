const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const argumen = args.join(" ");
    if (!args) return message.reply("I can't say nothing");

    message.channel.send(`${message.author} says:\n\n${argumen}`);
  },
};
