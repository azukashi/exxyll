const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  aliases: ["p"],
  usage: "song-name or youtube-link",
  description: "Play Music from YouTube.",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply(`Please Join a Voice Channel First!`);

    const query = args.join(" ");
    if (!query) return message.reply(`Please enter a song name!`);

    await client.player.play(message, query);
  },
};
