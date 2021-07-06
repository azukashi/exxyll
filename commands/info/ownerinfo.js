const { Client, Message, MessageEmbed } = require("discord.js");
const recon = require("reconlx");
const ReactionPages = recon.ReactionPages;

module.exports = {
  name: "owner",
  aliases: ["ownerinfo"],
  usage: "",
  description: "Returns about owner information",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed1 = new MessageEmbed()
      .setTitle(`Owner Info`)
      .setThumbnail("https://avatars.githubusercontent.com/u/68645946?v=4")
      .addField(`Name`, `Gifaldy Azka`)
      .addField(`Discord Tag`, `Falcxxdev#0001`)
      .addField(
        `Working on`,
        `Bot Development, Website Development, Feature Development`
      )
      .addField(`Location`, `Bandung, Indonesia`)
      .addField(
        `Social Media`,
        `[Website](https://gifaldyazka.is-a.dev) | [GitHub](https://github.com/gifaldyazkaa) | [Twitter](https://twitter.com/falcxxr)`
      )
      .addField(
        `Buy me a Coffee`,
        `[Buy me a Coffee Here](https://buymeacoffee.com/gifaldyazkaa)`
      )
      .setColor("PURPLE");

    let embed2 = new MessageEmbed()
      .setTitle(`Owner Info`)
      .setThumbnail("https://avatars.githubusercontent.com/u/81457810?v=4")
      .addField(`Name`, `Natsune Ayane || なつねあやね`)
      .addField(`Discord Tag`, `She isn't using discord rn`)
      .addField(`Working on`, `Web Development Assist`)
      .addField(`Location`, `Hokkaido, Japan`)
      .addField(`Social Media`, `[GitHub](https://github.com/NatsuneAyane)`)
      .addField(`Buy me a Coffee`, `-`)
      .setColor("GREEN");

    const pages = [embed1, embed2];
    const textPageChange = true;
    const emojis = ["⏪", "⏩"];
    const time = 60000;
    ReactionPages(message, pages, textPageChange, emojis, time);
  },
};
