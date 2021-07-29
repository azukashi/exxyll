const { Client, Message, MessageEmbed } = require("discord.js");
const { response } = require("express");
const fetch = require("node-fetch");

module.exports = {
  name: "banner",
  description: "Returns user banner or banner color",
  aliases: [],
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    fetch(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.banner) {
          const extension = body.banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user.id}${body.banner}${extension}?size=1024`;

          const embed = new MessageEmbed()
            .setTitle(`${user.username}'s Banner Image`)
            .setImage(url)
            .setColor("BLUE");

          message.lineReplyNoMention(embed);
        } else {
          if (body.accent_color) {
            const embed = new MessageEmbed()
              .setDescription(
                `${user.username} doesn't have a banner. But they do have a accent color!`
              )
              .setColor(body.accent_color);

            message.lineReplyNoMention(embed);
          } else
            return message.lineReply(
              `${user.username} is not have a banner and accent color!`
            );
        }
      });
  },
};
