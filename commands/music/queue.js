const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["playlist", "plist"],
  usage: "",
  description: "Show Playing Queue.",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // Checking if user in voice channels.
    if (!message.member.voice.channel)
      return message.lineReply("Please Join a Voice Channel First!");
    if (!client.player.getQueue(message))
      return message.lineReply("No music currently playing!");

    let queue = client.player.getQueue(message);
    const embed = new MessageEmbed()
      .setTitle("Queue List")
      .addField(
        queue.songs
          .map(
            (song, id) =>
              `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\`\n${
                song.url
              }`
          )
          .join("\n")
      )
      .setColor("BLUE")
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
