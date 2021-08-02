const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  /**
   * @param { Client } client
   * @param { CommandInteraction } interaction
   */
  if (interaction.isCommand()) {
    await interaction.defer().catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured!" });

    const args = [];
    interaction.options.data.map((x) => {
      args.push(x.value);
    });

    cmd.run(client, interaction, args);
  }
});
