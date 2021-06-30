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
          inline: true,
        },
        {
          name: `Discord Tag`,
          value: `Falcxxdev#0001`,
          inline: true,
        },
        {
          name: `Working on`,
          value: `Bot development, Website Development, Feature Development`,
          inline: true,
        },
        {
          name: `Location`,
          value: `Bandung, Indonesia`,
          inline: true,
        },
        {
          name: `Social Media`,
          value: `[Website](https://gifaldyazkaa.github.io) | [GitHub](https://github.com/gifaldyazkaa) | [Twitter](https://twitter.com/falcxxr)`,
          inline: true,
        },
        {
          name: `Buy me a Coffee`,
          value: `[Buy me a Coffee Here](https://buymeacoffee.com/gifaldyzkaa)`,
          inline: true,
        }
      )
      .setColor("PURPLE")
      .setFooter(
        "Page 1 / 2",
        message.author.displayAvatarURL({ dynamic: true })
      );

    const embed2 = new MessageEmbed()
      .setTitle(`Owner Info`)
      .setThumbnail("https://avatars.githubusercontent.com/u/81457810?v=4")
      .addFields(
        {
          name: `Name`,
          value: `Natsune Ayane || なつねあやね`,
          inline: true,
        },
        {
          name: `Discord Tag`,
          value: `She isn't using discord rn`,
          inline: true,
        },
        {
          name: `Working on`,
          value: `Web Development Assist`,
          inline: true,
        },
        {
          name: `Location`,
          value: `Hokkaido, Japan`,
          inline: true,
        },
        {
          name: `Social Media`,
          value: `[GitHub](https://github.com/NatsuneAyane)`,
          inline: true,
        },
        {
          name: `Buy me a Coffee`,
          value: `-`,
          inline: true,
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
    ReactionPages(msg, pages, textPageChange, emojis, time);
  },
};
