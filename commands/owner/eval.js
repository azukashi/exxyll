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
    if (message.author.id !== "788260234409672754")
      return message.lineReplyNoMention(
        new MessageEmbed()
          .setColor("#FF0000")
          .setTitle(`<:tickNo:863367014092898314> | 403 : Access Forbidden`)
          .setDescription(`Results\n\`\`\`yml\nerror: unauthorized\n\`\`\``)
      );

    const code = args.join(" ");
    if (!code)
      return message.lineReply("Please provide some code to evaluate!");

    try {
      const result = await eval(code);
      let output = result;

      if (typeof result !== "string") {
        output = inspect(result);
      }

      message.lineReplyNoMention(
        new MessageEmbed()
          .setColor("#00FF00")
          .setTitle(`<:tickYes:863367013464408084> | 200 : Success`)
          .setDescription(`Results\n\`\`\`yml\n${output}\n\`\`\``)
          .setFooter(`Actioned by : ${message.author.tag}`)
      );
    } catch (error) {
      console.log(error);
      message.lineReplyNoMention(
        new MessageEmbed()
          .setTitle(
            `<:tickNo:863367014092898314> | Evaluated Content too long to displayed`
          )
          .setDescription(`Error Logs\n\`\`\`yml\n${error}\n\`\`\``)
          .setColor("#FF0000")
          .setFooter(`Actioned by : ${message.author.tag}`)
      );
    }
  },
};
