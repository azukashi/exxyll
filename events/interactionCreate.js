const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  /**
   * @param { Client } client
   * @param { CommandInteraction } interaction
   */
  if (interaction.isCommand()) {
    await interaction.deferReply().catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured!" });

    const args = [];
    interaction.options.data.map((x) => {
      args.push(x.value);
    });

    cmd.run(client, interaction, args);

    const userperm = interaction.member.permissions.has(cmd.userperm);
    const botperm = interaction.guild.me.permissions.has(cmd.botperm);
    if (!userperm) return interaction.followUp({ content: `You need \`${cmd.userperm || []}\` Permissions` });
    if (!botperm) return interaction.followUp({ content: `I need \`${cmd.botperm || []}\` Permissions` });
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
  }
  if (interaction.customId === "tic") {
    try {
      const thread = await interaction.channel.threads
        .create({
          name: `${interaction.user.username}#${interaction.user.discriminator}`,
          autoArchiveDuration: 60,
          // type: 'GUILD_PRIVATE_THREAD',
          reason: "New Ticket has been created!",
        })
        .catch((err) => {
          const errormsg = new MessageEmbed().setTitle("Something went wrong!").setDescription(`Given error message : \n\`\`\`yml\n${err}\n\`\`\``).setColor("RED").setTimestamp();
          return interaction.followUp({ embeds: [errormsg], ephemeral: true });
        });
      await thread.setLocked(true).catch((err) => {
        console.log(err);
      });
      const embed = new MessageEmbed()
        .setTitle("Ticket")
        .setDescription("Hello there, \nThe staff will be here as soon as possible mean while tell us about your issue!\nThank You!")
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(
          interaction.guild.name,
          interaction.guild.iconURL({
            dynamic: true,
          })
        );

      const del = new MessageActionRow().addComponents(new MessageButton().setCustomId("del").setLabel("🗑️ Delete Ticket!").setStyle("DANGER"));
      interaction.user.send("Your ticket has been opened!");
      thread.send({
        content: `Welcome <@${interaction.user.id}>`,
        embeds: [embed],
        components: [del],
      });
      console.log(`Created thread: ${thread.name}`);
      setTimeout(() => {
        interaction.channel.bulkDelete(1);
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  } else if (interaction.customId === "del") {
    const thread = interaction.channel;
    thread.delete();
  }
});
