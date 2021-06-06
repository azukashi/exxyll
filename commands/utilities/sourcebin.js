const { Client, Message, MessageEmbed } = require("discord.js");
const { create } = require("sourcebin");

module.exports = {
  name: "sourcebin",
  aliases: ["bin"],
  usage: "code",
  description: "Upload a JavaScript code to Sourcebin",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const content = args.join(" ");
    if (!content) return message.reply("Please give a code to upload!");

    create(
      [
        {
          name: "Random code",
          content,
          language: "javascript",
        },
      ],
      {
        title: `Result Code`,
        description: `Code uploaded by Exxyll Discord Bot`,
      }
    ).then((value) => {
      message.channel.send(`Your code has been posted : ${value.url}`);
    });
  },
};
