const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show Help List Commands",
  options: [],
  userperm: "SEND_MESSAGES",
  botperm: "SEND_MESSAGES",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const emojis = {
      config: "<:settings:863951175875559425>",
      developer: "<:developer:855302873785040897>",
      fun: "<:teri_funny:876637356986343440>",
      guild: "<:partnernew:863214932585873438>",
      info: "<:wininfo:875298951362932736>",
      levelling: "⏫",
      music: "🎵",
      ticket: "🎟",
    };
    const directories = [...new Set(client.commands.map((cmd) => cmd.directory))];

    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
          return {
            name: cmd.name || "No Name",
            description: cmd.description || "No Description Provided",
            emoji: cmd.emoji || "",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new MessageEmbed()
      .setTitle("Exxyll Help Desk")
      .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
      .setDescription("Please choose a category in the dropdown menu!\n\nFor information about usage, or something about commands, You can [Read the Docs](https://google.com) for more info!")
      .setColor("BLUE");

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Please select a category")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category`,
                emoji: emojis[cmd.directory.toLowerCase()] || null,
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.followUp({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) => interaction.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find((x) => x.directory.toLowerCase() === directory);

      const categoryEmbed = new MessageEmbed()
        .setTitle(`${emojis[directory.toLowerCase()]} ${formatString(directory)} Commands`)
        .setDescription(`Here are the list of commands!`)
        .setColor("BLUE")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `${cmd.emoji} \`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            };
          })
        )
        .setTimestamp();

      interaction.update({ embeds: [categoryEmbed] });
    });
  },
};
