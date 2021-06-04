const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description: "Show details about Now Playing Song",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please Join a Voice Channel First!");
    if (!client.player.getQueue(message))
      return message.reply("No music currently playing!");

    const track = await client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => {
        if (client.player.getQueue(message).filters[filterName])
          filters.push(filterName);
      }
    );

    message.channel.send({
      embed: {
        color: "BLUE",
        author: { name: track.title },
        footer: { text: "exxyll.github.io" },
        fields: [
          { name: "Channel", value: track.author, inline: true },
          {
            name: "Requested by",
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: "From Playlist",
            value: track.fromPlaylist ? "Yes" : "No",
            inline: true,
          },

          { name: "Views", value: track.views, inline: true },
          { name: "Duration", value: track.duration, inline: true },
          { name: "Filters activated", value: filters.length, inline: true },

          {
            name: "Progress bar",
            value: client.player.createProgressBar(message, {
              timecodes: true,
            }),
            inline: true,
          },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date(),
      },
    });
  },
};
