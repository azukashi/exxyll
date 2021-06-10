const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wiki",
  aliases: ["wikipedia"],
  usage: "query",
  description: "Search something to Wikipedia",
  run: async (client, message, args) => {
    const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        args.join(" ")
      )}`
    ).then((res) => res.json().catch(() => {}));
    if (!body) return message.lineReplyNoMention("Page not found :x:");
    if (body.title && body.title === "Not found.")
      return message.lineReplyNoMention("Error! Page Not Found... :x:");

    const embed = new Discord.MessageEmbed()
      .setTitle(`🌐 ${body.title}`)
      .addField(
        "More Info:",
        `**[Click Here](${body.content_urls.desktop.page})**`,
        true
      )
      .setDescription(`** ${body.extract} **`)
      .setFooter(
        `Wikipedia Search | Command Request by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("BLUE");

    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
    message.lineReplyNoMention(embed);
  },
};
