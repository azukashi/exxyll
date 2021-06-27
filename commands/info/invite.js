const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["invite-bot"],
  usage: "",
  description: "Returns Links to Invite the Bot",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/848232775798226996/a1663c970cb38f341a53a0be608fbb56.png?size=128"
      )
      .setTitle("Invite me to your server!")
      .setDescription(
        `[Invite and Authorize](https://discord.com/api/oauth2/authorize?client_id=848232775798226996&permissions=3222646&scope=bot)\n\n[Visit Website](https://exxyll.github.io)\n\n[Join Support Server](https://discord.gg/j2MfuWySfD)`
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    // const button1 = new MessageButton()
    //     .setStyle('url')
    //     .setLabel('Invite Me!')
    //     .setID('button1')
    //     .setURL('https://discord.com/api/oauth2/authorize?client_id=848232775798226996&permissions=4294962679&scope=bot')

    // const button2 = new MessageButton()
    //     .setStyle('red')
    //     .setLabel('Visit Website!')
    //     .setID('button2')
    //     .setDisabled()

    // message.channel.send({
    //     buttons: [button1, button2],
    //     embed: embed
    // });

    message.lineReplyNoMention(embed);
    message.channel.stopTyping();
  },
};
