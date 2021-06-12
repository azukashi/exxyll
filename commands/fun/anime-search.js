const { Client, Message, MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");
const { prefix } = require("../../config.json");

module.exports = {
  name: "anime-search",
  aliases: ["search-anime"],
  usage: "anime-title",
  description: "Search a Anime Details",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args.length) {
      return message.channel.send("Please Give Anime Name!");
    }
    //DEFINE OPTIONS

    let option = {
      url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
      method: `GET`,
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      json: true,
    };

    message.channel.send("Fetching The Info...").then((msg) => {
      get(option).then((body) => {
        try {
          let embed = new MessageEmbed()
            .setTitle(body.data[0].attributes.titles.en)
            .setColor("RED")
            .addDescription("ℹ About", body.data[0].attributes.synopsis)
            .setThumbnail(body.data[0].attributes.posterImage.original)
            .addField("⭐ Ratings ⭐", body.data[0].attributes.averageRating)
            //.addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
            .setImage(body.data[0].attributes.coverImage.large);
          //try it

          message.channel.send(embed);
          msg.delete();
        } catch (err) {
          msg.delete();
          return message.channel.send(
            `Unable to find this anime\nError : \`${err}\``
          );
        }
      });
    });
  },
};
