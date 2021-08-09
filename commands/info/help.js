const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Help Commands",
  aliases: ['h'],
  emoji: 'ℹ',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const emojis = {
      developer: "<:developer:855302873785040897>",
      info: "ℹ",
      levelling: "⏫",
      music: "🎵",
      ticket: "🎟",
    };
    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

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
      .setDescription("Please choose a category in the dropdown menu!")
      .setColor("GOLD");

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

    const initialMessage = await message.channel.send({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new MessageEmbed()
        .setTitle(`${emojis[directory.toLowerCase()]} ${formatString(directory)} Commands`)
        .setDescription(`Here are the list of commands!`)
        .setColor('GOLD')
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
