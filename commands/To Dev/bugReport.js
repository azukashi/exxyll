const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "report",
  usage: "query",
  description: "Command to Report an Bot Issues to Developer",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get("788260234409672754");

    const query = args.join(" ");

    if (!query) return message.reply("Please specify a query to report!");

    const thanksFor = new MessageEmbed()
      .setTitle("Thanks for reporting!")
      .setDescription(
        `<@${message.author.id}>, Sorry for the inconvenience, and thanks for reporting the issues!\nYour report now is reviewed by our staff.`
      )
      .setTimestamp()
      .setColor("RED");

    const reportEmbed = new MessageEmbed()
      .setTitle("New Bug Issues!")
      .addField("Author", message.author.toString(), true)
      .addField("Guild", message.guild.name, true)
      .addField("Report Description", query)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setColor("BLUE")
      .setTimestamp();

    if (!query) return message.lineReplyNoMention("Please specify a query!");
    owner.send(reportEmbed);
    if (query) return message.lineReplyNoMention(thanksFor);
    message.delete();
  },
};
