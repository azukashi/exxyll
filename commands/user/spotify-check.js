const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "spotify",
  aliases: ["spotify-check"],
  usage: "",
  description: "Returns Inforamtion about music you play on spotify",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    user.presence.activities.forEach((activity) => {
      if (
        activity.type === "LISTENING" &&
        activity.name === "Spotify" &&
        activity.assets !== null
      ) {
        let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
          8
        )}`;
        let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

        let trackName = activity.details;
        let trackAuthor = activity.state;
        let trackAlbum = activity.assets.largeText;

        trackAuthor = trackAuthor.replace(/;/g, ",");

        const embed = new MessageEmbed()
          .setAuthor(
            "Spotify Track Info",
            "https://cdn.discordapp.com/emojis/408668371039682560.png"
          )
          .setColor("GREEN")
          .setThumbnail(trackIMG)
          .addField("Song Name", `\`\`\`json\n"${trackName}"\n\`\`\``, true)
          .addField("Album", `\`\`\`json\n"${trackAlbum}"\n\`\`\``, true)
          .addField("Author", `\`\`\`json\n"${trackAuthor}"\n\`\`\``, true)
          .addField(
            "Listen to Track",
            `${`\`\`\`json\n"${trackURL}"\n\`\`\``}`,
            false
          )
          .setFooter(
            user.displayName,
            user.user.displayAvatarURL({ dynamic: true })
          );
        message.lineReplyNoMention(embed);
      } else {
        message.lineReply('You\'re not listening to spotify right now!')
      }
    });
  },
};
