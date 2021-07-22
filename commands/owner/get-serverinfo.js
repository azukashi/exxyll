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
    if (!message.author.id === "788260234409672754") return;
    const guild = client.guilds.cache.get(args[0]);
    if (!guild)
      return message.lineReply("Wrong Guild ID or Guild ID isn't Defined!");
    const embed = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .setColor("RANDOM")
      .addField("General Info", [
        `🆔 ID : ${guild.id}`,
        `<:partnernew:863214932585873438> Name : ${guild.name}`,
        `<:owner:864432628928217098> Owner : ${guild.owner}`,
      ])
      .addField("Counts", [
        `<:role:863214921574907915> Role : ${guild.roles.cache.size} Roles`,
        `<:channel:863363700463632414> Channels : ${
          guild.channels.cache.filter(
            (ch) => ch.type === "text" || ch.type === "voice"
          ).size
        } total (Text : ${
          guild.channels.cache.filter((ch) => ch.type === "text").size
        }, Voice : ${
          guild.channels.cache.filter((ch) => ch.type === "voice").size
        })`,
        `<:add_reaction:863214931599818783> Emojis : ${
          guild.emojis.cache.size
        } (Regular : ${
          guild.emojis.cache.filter((e) => !e.animated).size
        }, Animated : ${guild.emojis.cache.filter((e) => e.animated).size})`,
      ])
      .addField("Additional Information", [
        `🕘 Created : ${moment(guild.createdTimestamp).format("LT")} ${moment(
          guild.createdTimestamp
        ).format("LL")} ${moment(guild.createdTimestamp).fromNow()}`,
        `<:maps_logo:864435720507359232> Region : ${guild.region}`,
        `<a:boostr:864431598567817216> Boost Tier : ${
          guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"
        }`,
        `<:boost:862677231696347146> Boost Count : ${
          guild.premiumSubscriptionCount || "0"
        }`,
      ]);

    message.lineReplyNoMention(embed);
  },
};
