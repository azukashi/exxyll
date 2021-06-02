const { Client, Message, MessageEmbed } = require("discord.js");
const distube = require("distube");

module.exports = {
  name: "skip",
  aliases: ["next"],
  category: "music",
  description: "skips music",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please Join a Voice Chanenel First!");

    await client.player.skip(message);
    message.channel.send("skipped!");
  },
};
