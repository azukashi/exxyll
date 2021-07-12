const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "get-server",
  aliases: ["get-serverinfo"],
  description: "Show information about server in Global Scope",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.author.id === '788260234409672754') return;
    const guild = client.guilds.cache.get(args[0]);
    if(!guild) return message.lineReply('Please specify guild id!');
    const embed = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL())
      .setColor("RANDOM")
      .addField("General Info", [
        `ID : ${guild.id}`,
        `Name : ${guild.name}`,
        `Owner : ${guild.owner}`,
      ])
      .addField("Counts", [
        `Role : ${guild.roles.cache.size} Roles`,
        `Channels : ${
          guild.channels.cache.filter(
            (ch) => ch.type === "text" || ch.type === "voice"
          ).size
        } total (Text : ${
          guild.channels.cache.filter((ch) => ch.type === "text").size
        }, Voice : ${
          guild.channels.cache.filter((ch) => ch.type === "voice").size
        })`,
        `Emojis : ${guild.emojis.cache.size} (Regular : ${
          guild.emojis.cache.filter((e) => !e.animated).size
        }, Animated : ${guild.emojis.cache.filter((e) => e.animated).size})`,
      ])
      .addField("Additional Information", [
        `Created : ${moment(guild.createdTimestamp).format("LT")} ${moment(
          guild.createdTimestamp
        ).format("LL")} ${moment(guild.createdTimestamp).fromNow()}`,
        `Region : ${guild.region}`,
        `Boost Tier : ${
          guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"
        }`,
        `Boost Count : ${guild.premiumSubscriptionCount || "0"}`,
      ]);

    message.lineReplyNoMention(embed);
  },
};
