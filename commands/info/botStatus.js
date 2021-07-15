const {
  Client,
  Message,
  MessageEmbed,
  version: djsversion,
} = require("discord.js");
const { mem, cpu } = require("node-os-utils");
const { utc } = require("moment");
const { totalMemMb } = mem.info();
const version = require("../../package.json").version;
const os = require("os");
const ms = require("ms");
const pretty = require("pretty-ms");

module.exports = {
  name: "stats",
  aliases: ["botstatus"],
  description: "Show Bot Status.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // Capitalize Func
    function capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const core = os.cpus()[0];
    const messageping = msg.createdTimestamp - message.createdTimestamp;
    const embed = new MessageEmbed()
      .setTitle(`Exxyll Stats`)
      .setURL(client.web)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || client.color)
      .addField("<a:bot:863216970554933269> General", [
        `**❯ Client :** ${client.user.tag} (${client.user.id})`,
        `**❯ Commands Total :** ${client.commands.size}`,
        `**❯ Server :** ${client.guilds.cache.size.toLocaleString()} Servers`,
        `**❯ Users :** ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()} Users`,
        `**❯ Channels :** ${client.channels.cache.size.toLocaleString()} Channels`,
        `**❯ Creation Date :** ${utc(client.user.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )}`,
        `**❯ Node.js :** ${process.version}`,
        `**❯ Version :** v${version}`,
        `**❯ Discord.js :** v${djsversion}`,
        `**❯ Bot Uptime :** ${pretty(client.uptime)}`,
        "\u200b",
      ])
      .addField("<:ubuntu:853158810654343208> System", [
        `**❯ OS Platform :** ${capitalizeFirst(process.platform)}`,
        `**❯ OS Uptime :** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU :**`,
        `\u3000 Cores : ${os.cpus().length}`,
        `\u3000 Model : ${core.model}`,
        `\u3000 Speed : ${core.speed} MHz`,
      ])
      .addField("<:stagechannel:863214920548089866> Network", [
        `**❯ Latency :** ${client.ws.ping} ms`,
        `**❯ Discord API :** ${Math.floor(messageping)} ms`,
      ])
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
