const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelinfo",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("Please mention a channel.");
    let inline = true;
    try {
      let e = new MessageEmbed()
        .setTitle(`Channel Information`)
        .setThumbnail(message.guild.iconURL({ dynamic: false }))
        .setDescription(`Information About ${channel}`)
        .addField("Created At:", `${checkDays(channel.createdAt)}`, inline)
        .addField("Channel ID:", `${channel.id}`, inline)
        .addField("Channel Type:", `${channel.type}`, inline)
        .setFooter(
          `Channel Information | Command Request by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("BLUE");
      message.channel.send({ embed: e });
    } catch (error) {
      message.channel.send(error);
    }
  },
};
