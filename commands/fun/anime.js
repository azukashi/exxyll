const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

// Endpoints : https://kitsu.io/api/edge/anime?filter[text]=${query}
// Unsplash Image not Found : https://source.unsplash.com/1920x1080/?Okushiri

module.exports = {
  name: "anime",
  aliases: ["anime-search", "search-anime"],
  usage: "anime-name",
  description: "Search anime details",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // Define Query & Checking
    const query = args.join(" ");
    if (!query) return message.lineReply("Please specify a query to search!");
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`)
      .then((res) => res.json())
      .then((body) => {
        const title = body.data[0].attributes.titles.en_jp;
        const synopsis = body.data[0].attributes.synopsis;
        const thumbnail =
          body.data[0].attributes.posterImage.original ||
          `https://source.unsplash.com/1920x1080/?Okushiri`;
        const ratings = body.data[0].attributes.averageRating;
        const episodes = body.data[0].attributes.episodeCount;
        const status = body.data[0].attributes.status;
        const image =
          body.data[0].attributes.coverImage.large ||
          `https://source.unsplash.com/1920x1080/?Okushiri`;

        const resultEmbed = new MessageEmbed()
          .setTitle(title)
          .setDescription(synopsis)
          .setThumbnail(thumbnail)
          .addField("Ratings", ratings)
          .addField("Total Episodes", episodes)
          .addField("Status", status)
          .setImage(image)
          .setColor("BLUE")
          .setFooter(
            `Requested by : ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.channel.send(resultEmbed);
      })
      .catch((err) =>
        message.lineReplyNoMention(
          new MessageEmbed()
            .setDescription(`<:tickNo:863367014092898314> | That anime isn't found!\n\n\`\`\`js\n${err}\n\`\`\``)
            .setColor('RED')
        )
      );
  },
};
