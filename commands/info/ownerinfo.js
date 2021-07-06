const { Client, Message, MessageEmbed } = require("discord.js");
const paginationEmbed = require('discord.js-pagination');
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
      .addFields(
        {
          name: `Name`,
          value: `Gifaldy Azka`,
        },
        {
          name: `Discord Tag`,
          value: `Falcxxdev#0001`,
        },
        {
          name: `Working on`,
          value: `Bot development, Website Development, Feature Development`,
        },
        {
          name: `Location`,
          value: `Bandung, Indonesia`,
        },
        {
          name: `Social Media`,
          value: `[Website](https://gifaldyazkaa.github.io) | [GitHub](https://github.com/gifaldyazkaa) | [Twitter](https://twitter.com/falcxxr)`,
        },
        {
          name: `Buy me a Coffee`,
          value: `[Buy me a Coffee Here](https://buymeacoffee.com/gifaldyzkaa)`,
        }
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

      pages = [
        embed1,
        embed2,
    ];
    const textPageChange = true;
    const emojis = ["⏪", "⏩"];
    const time = 60000;
    paginationEmbed(message, pages, emojis, time);
  },
};
