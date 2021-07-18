const { Client, Message, MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");

module.exports = {
  name: "youtube-search",
  aliases: ["yts", "ys"],
  usage: "<query or title of video to search>",
  description: "Search YouTube Video in Discord!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query)
      return message.lineReply("Provide a search for me to search YouTube!");

    const res = await ytsr(query).catch((e) =>
      message.lineReplyNoMention(`No results found for ${query}`)
    );
    const video = res.items.filter((i) => i.type === "video")[0];
    const embed = new MessageEmbed()
      .setTitle(video.title)
      .setURL(video.url)
      .setImage(video.bestThumbnail.url)
      .setDescription(video.description ? !video.description : "No Description")
      .addField(
        `Song Information`,
        `**Creator**: [${video.author.name}](${video.author.url}) ${
          video.author.verified ? ":white_check_mark: (Verified)" : "\u200b"
        }
**Length**: ${video.duration} minute(s)
**Uploaded**: ${video.uploadedAt}
**Views**: ${video.views.toLocaleString()}`
      )
      .setThumbnail(video.author.bestAvatar.url);
    message.lineReplyNoMention(embed);
  },
};
