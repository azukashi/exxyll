const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite Exxyll Today!",
  emoji: "➕",
  userperm: ["SEND_MESSAGES"],
  botperm: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setTitle("Invite me to your server!")
      .setDescription(
        `[Invite and Authorize](https://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=1077226614&scope=bot) | [Visit Website](https://exxyll.github.io) | [Join Support Server](https://discord.gg/j2MfuWySfD)\n\n[Vote at Top.gg](https://top.gg/bot/848232775798226996)`
      )
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send({ embeds: [embed] });
  },
};
