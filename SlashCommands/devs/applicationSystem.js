const {
  CommandInteraction,
  Client,
  WebhookClient,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "apply",
  description: "Apply for be a Exxyll Bot Developers!",
  aliases: [],
  options: [
    {
      name: "name",
      description: "Specify your name. Please use real name!",
      required: true,
      type: "STRING",
    },
    {
      name: "reasons",
      description:
        "Specify your reasons, Why you want to be a collaborator at exxyll project",
      required: true,
      type: "STRING",
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const owner = client.users.cache.get("788260234409672754");
    const [name, reasons] = args;
    const appls = new MessageEmbed()
      .setTitle("New Application!")
      .setDescription(`Name : **${name}**\nReasons : \n\`\`\`fix\n${reasons}\n\`\`\``)
      .setColor("#800080");
    owner
      .send({ embeds: [appls] })
      .then(() =>
        interaction.followUp({ content: "Your application successfully sent!" })
      );
  },
};
