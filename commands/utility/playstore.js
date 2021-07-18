const { Client, Message, MessageEmbed } = require("discord.js");
const PlayStore = require("google-play-scraper");

module.exports = {
  name: "playstore",
  aliases: ["gplaystore", "gplay"],
  usage: "<app-name>",
  description: "Search Details about an application.",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const search = args.join(" ");

    if (!search) return message.lineReply("Please provide search query");

    PlayStore.search({
      term: args.join(" "),
      num: 1,
    }).then((Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.lineReply("No Application Found!");
      }

      const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField("Price", App.priceText, true)
        .addField("Developer", App.developer, true)
        .addField("Score", App.scoreText, true)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();

      return message.lineReplyNoMention(Embed);
    });
  },
};
