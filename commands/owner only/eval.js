const { Client, Message, MessageEmbed } = require("discord.js");
const { inspect } = require("util");

module.exports = {
  name: "eval",
  description: "Evaluate some code to evaluate",
  usage: "<code>",
  hidden: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;

    const code = args.join(" ");
    if (!code)
      return message.lineReply("Please provide some code to evaluate!");

    try {
      const result = await eval(code);
      let output = result;

      if (typeof result !== "string") {
        output = inspect(result);
      }

      message.lineReplyNoMention(output, { code: "js" });
    } catch (error) {
      console.log(error);
      message.lineReplyNoMention(
        `Evaluated content is too long to display.\n\nError : ${error}`
      );
    }
  },
};
