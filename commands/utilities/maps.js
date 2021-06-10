const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "maps",
  aliases: ["gmaps"],
  usage: "location",
  description: "Search Details about a Location",
  run: async (client, message, args) => {
    const sit = args.join(" ");
    if (!args.length) return message.lineReply("Provide a valid location");
    const site = `https://maps.google.com/?q=${args.join("+")}`;
    try {
      const msg = await message.lineReplyNoMention(
        "**Please wait...** This may take up to 10 seconds."
      );
      msg.delete({ timeout: 5000 });
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
      let att = new Discord.MessageAttachment(body, `${sit}.png`);
      return message.lineReplyNoMention(att);
    } catch (err) {
      return message.lineReply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  },
};
