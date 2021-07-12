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
    const owner = client.users.cache.get('788260234409672754')
    const embed1 = new MessageEmbed()
      .setTitle(`<a:bot:863216970554933269> Owner Info`)
      .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
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

    // const pages = [embed1, embed2];
    // const textPageChange = true;
    // const emojis = ["⏪", "⏩"];
    // const time = 60000;
    // ReactionPages(message, pages, textPageChange, emojis, time);
    message.lineReplyNoMention(embed1);
  },
};
