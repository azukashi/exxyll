const { Client, Message, MessageEmbed } = require("discord.js");
const { mem, cpu } = require("node-os-utils");
let m = require("moment-duration-format"),
  os = require("os"),
  cpuStat = require("cpu-stat"),
  ms = require("ms"),
  moment = require("moment");
const version1 = require("discord.js").version;
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
    cpuStat.usagePercent(async function (error, percent, seconds) {
      if (error) {
        return console.error(error);
      }
      const cores = os.cpus().length;
      const cpuModel = os.cpus()[0].model;
      const guilds = client.guilds.cache.size.toLocaleString();
      const users = client.users.cache.size.toLocaleString();
      const channels = client.channels.cache.size.toLocaleString();
      const usage = formatBytes(process.memoryUsage().heapUsed);
      const node = process.version;
      const CPU = percent.toFixed(2);
      const { totalMemMb, usedMemMb } = await mem.info();

      const embed = new MessageEmbed()
        .addField(
          "Exxyll Stats",
          `**📂 Total Servers** ${guilds}\n\n**👥 Total Users**: ${users}\n\n**💬 Total Channels**: ${channels}\n\n**✅ Usage**: ${usage}\n\n**<:node:849596876596838400> Node Version**: ${node}\n\n**<:djs:849597018211876864> Discord.js Version**: v${version1}\n\n**<:intel:849596955968405546> Cpu Usage** ${CPU}\n\n**📑 Total Ram: ${totalMemMb} Mb**\n\n**📀 Ram used: ${usedMemMb}**\n\n**💻 Platform: ${process.platform}**\n\n**♐ Arch: ${process.arch}**`
        )
        .addField(
          "**Cpu Stats**",
          `**CPU**: ${cpuModel}\n\n **Cores**: ${cores}`
        )
        .setColor("BLUE")
        .setTimestamp();

      message.channel.send(embed);
    });

    function formatBytes(a, b) {
      let c = 1024;
      d = b || 2;
      (e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]),
        (f = Math.floor(Math.log(a) / Math.log(c)));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
    }
  },
};
