const client = require('../../index');

client.on('interactionCreate', async interaction => {
    /**
     * @param { Client } client
     * @param { CommandInteraction } interaction
     */
    if (interaction.isCommand()) {
        await interaction.deferReply().catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: 'An error has occured!' });

        const args = [];
        interaction.options.data.map(x => {
            args.push(x.value);
        });

        cmd.run(client, interaction, args);

        // Permission Handling
        const userperm = interaction.member.permissions.has(cmd.userperm);
        const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!userperm)
            return interaction.followUp({
                content: `You need \`${cmd.userperm || []}\` Permissions`,
            });
        if (!botperm)
            return interaction.followUp({
                content: `I need \`${cmd.botperm || []}\` Permissions`,
            });
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
