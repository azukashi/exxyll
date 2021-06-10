const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "device",
  aliases: ["deviceDetect", "devices"],
  usage: "",
  description: "Check user Device Type",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    message.channel.startTyping();
    const user = message.mentions.users.last() || message.author;
    const devices = user.presence?.clientStatus || {};
    const description = () => {
      const entries = Object.entries(devices)
        .map(
          (value, index) =>
            `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`
        )
        .join("\n");
      return `Devices : \n${entries}`;
    };

    const embed = new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL())
      .setDescription(description())
      .setColor("BLUE");

    message.channel.send(embed);
    message.channel.send(
      `Device Logged-In : ` + Object.entries(devices).length
    );
    message.channel.stopTyping();
  },
};
