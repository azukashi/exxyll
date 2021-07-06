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
      .setColor("PURPLE")
      .setFooter(
        "Page 1 / 2",
        message.author.displayAvatarURL({ dynamic: true })
      );

    let embed2 = new MessageEmbed()
      .setTitle(`Owner Info`)
      .setThumbnail("https://avatars.githubusercontent.com/u/81457810?v=4")
      .addFields(
        {
          name: `Name`,
          value: `Natsune Ayane || なつねあやね`,
        },
        {
          name: `Discord Tag`,
          value: `She isn't using discord rn`,
        },
        {
          name: `Working on`,
          value: `Web Development Assist`,
        },
        {
          name: `Location`,
          value: `Hokkaido, Japan`,
        },
        {
          name: `Social Media`,
          value: `[GitHub](https://github.com/NatsuneAyane)`,
        },
        {
          name: `Buy me a Coffee`,
          value: `-`,
        }
      )
      .setColor("GREEN")
      .setFooter(
        "Page 2 / 2",
        message.author.displayAvatarURL({ dynamic: true })
      );

    const pages = [embed1, embed2];
    const textPageChange = true;
    const emojis = ["⏪", "⏩"];
    const time = 60000;
    ReactionPages(message, pages, textPageChange, emojis, time);
  },
};
