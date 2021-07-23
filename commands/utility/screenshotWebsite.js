const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "snapweb",
  aliases: ["snapshot-website", "screenshot-website", "scweb"],
  usage: "<url>",
  description: "Screenshot a Full Page of Website",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.lineReply("Please provide a Website URL!");
    const site = `https://shot.screenshotapi.net/screenshot?&url=${encodeURIComponent(
      query
    )}&fresh=true&output=json&file_type=png&wait_for_event=load`;
    try {
      const msg = await message.lineReplyNoMention(
        "**Please wait...** This may take up to 30 seconds."
      );
      msg.delete({ timeout: 5000 });
      await fetch(site)
        .then((res) => res.json())
        .then((body) => {
          const result = body.screenshot;
          const url = body.url;

          const embed = new MessageEmbed()
            .setTitle(url)
            .setURL(url)
            .setImage(result)
            .setColor("RANDOM")
            .setTimestamp();

          message.lineReplyNoMention(embed);
        })
        .catch((err) => {
          console.log(err);
          message.lineReply(
            `Something went wrong!\nError :\n\`\`\`yml\n${err}\n\`\`\``
          );
        });
    } catch (err) {
      return message.lineReply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  },
};
