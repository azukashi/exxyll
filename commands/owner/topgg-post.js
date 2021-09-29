const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "topgg-post",
  description: "Post Guild Count, Shard to Top.gg Website",
  aliases: ["topgg-posts"],
  hidden: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.author.id === "788260234409672754") return;
    const key = process.env.TOPGG_TOKEN;
    setInterval(() => {
      fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
        method: "POST",
        body: JSON.stringify({
          server_count: client.guilds.cache.size,
        }),
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
      });
    }, 3600000);
  },
};
