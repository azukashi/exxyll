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
      return message.lineReply(`Please Join a Voice Channel First!`);

    const query = args.join(" ");
    if (!query) return message.lineReplyNoMention(`Please enter a song name!`);

    await client.player.play(message, query);

    let queue = client.player.getQueue(message);
    const addedSong = new MessageEmbed()
      .setTitle(`<:youtube:853158600096350209> Added Music`)
      .setDescription(
        queue.songs.map(
          (song) =>
            `Song Name : ${song.name}\nDuration : ${song.formattedDuration}\nAdded by : ${song.user}`
        )
      )
      .setColor("RED")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(addedSong).catch((err) => message.channel.send(err));
  },
};
