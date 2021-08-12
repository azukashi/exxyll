const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "serverinfo",
  description: "Returns Information about Server",
  emoji: "🗂",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const vanityCode = message.guild.vanityURLCode;
    let vanityInvite = `https://discord.gg/${vanityCode}`;
    if (vanityCode === null) vanityInvite = "No custom URL";
    const members = message.guild.members.cache;
    const roles = message.guild.roles.cache
      .filter((r) => r.id !== message.guild.id)
      .map((role) => role.toString());
    const embed = new MessageEmbed()
      .setTimestamp()
      .setTitle(message.guild.name)
      .setColor("RANDOM")
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
      .addField(
        `General Information`,
        `<:partnernew:863214932585873438> Name : ${
          message.guild.name
        }\n🆔 ID : ${message.guild.id}\n<:owner:864432628928217098> Owner : ${
          (await message.guild.fetchOwner()).user
        }`
      )
      .addField(
        `Counts`,
        `<:members:863214932883800138> Members Total : ${message.guild.memberCount.toString()}\n<:role:863214921574907915> Role : ${
          roles.length
        }\n<:channel:863363700463632414> Channels : ${
          message.guild.channels.cache.filter(
            (ch) => ch.type === "text" || ch.type === "voice"
          ).size
        } total (Text : ${
          message.guild.channels.cache.filter((ch) => ch.type === "text").size
        }, Voice : ${
          message.guild.channels.cache.filter((ch) => ch.type === "voice").size
        })\n<:add_reaction:863214931599818783> Emojis : ${
          message.guild.emojis.cache.size
        } (Regular : ${
          message.guild.emojis.cache.filter((e) => !e.animated).size
        }, Animated : ${
          message.guild.emojis.cache.filter((e) => e.animated).size
        })`
      )
      .addField(
        `Additional Information`,
        `📅 Created at : ${moment(message.guild.createdTimestamp).format(
          "LLL"
        )} | \`${moment(
          message.guild.createdTimestamp
        ).fromNow()}\`\n<:maps_logo:864435720507359232> Region : ${
          message.guild.region
        }\n<a:boostr:864431598567817216> Boost Tier : ${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
        }\n<:boost:862677231696347146> Boost Count : ${
          message.guild.premiumSubscriptionCount.toString() || "0"
        }\n🔐 Verification Level : ${message.guild.verificationLevel.toString()}\n🔗 Vanity URL : ${vanityInvite}`
      )
      .addField(
        `Roles [${roles.length}]`,
        roles.length < 15
          ? roles.join(" | ")
          : roles.length > 15
          ? `${roles.slice(0, 15).join(" | ")} | \`+ ${
              roles.length - 15
            } roles...\``
          : "None"
      );
    message.channel.send({ embeds: [embed] });
  },
};
