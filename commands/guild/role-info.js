const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "roleinfo",
  description: "Returns Role Information",
  aliases: ["roleinf"],
  emoji: "<:role:863214921574907915>",
  userperm: ["SEND_MESSAGES"],
  botperm: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // Check days function
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }

    const mentionedRole =
      message.mentions.roles.first() ||
      client.guilds.cache.get(message.guild.id).roles.cache.get(args[0]);
    const guildIcon = client.guilds.cache
      .get(message.guild.id)
      .iconURL({ dynamic: true, size: 512 });
    if (!mentionedRole)
      return message.reply("Please mention or paste role id!");
    const embed = new MessageEmbed()
      .setTitle(
        `<:role:863214921574907915> Role Information for ${mentionedRole.name}`
      )
      .setColor("#800080")
      .setThumbnail(guildIcon)
      .addField("Role ID", `${mentionedRole.id}`)
      .addField("Role Position", `${mentionedRole.rawPosition}`)
      .addField("Role Color", `${mentionedRole.hexColor}`)
      .addField("Users", `${mentionedRole.members.size}`)
      .addField("Mentionable", `${mentionedRole.mentionable ? "Yes" : "No"}`)
      .addField("Hoist", `${mentionedRole.hoist ? "True" : "False"}`)
      .addField(
        "Creation Date",
        `${moment(mentionedRole.createdAt).format("LLLL")} (${checkDays(
          mentionedRole.createdAt
        )})`
      )
      .setFooter(message.author.tag)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
