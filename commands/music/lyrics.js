const { Client, Message, MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  usage: "<song-name>",
  description: "Command to see lyrics of the song.",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!args[0]) return message.reply(`Please specify a song.`);

    try {
      const title = args.join(" ");

      let lyrics =
        (await lyricsFinder(title)) || `Lyrics to that song was not found.`;

      const embed = new MessageEmbed()
        .setTitle(`Lyrics for ${title}`)
        .setColor("RANDOM")
        .setDescription(lyrics, {
          split: true,
        });
      message.channel.send({ embed: embed });
    } catch (error) {
      message.reply(`An error had occured: ${error}`);
    }
  },
};
