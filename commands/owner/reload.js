const { Client, Message, MessageEmbed } = require("discord.js");
const glob = require("glob");

module.exports = {
  name: "reload",
  aliases: ["node-reload"],
  description: "Reload all Commands",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    client.commands.sweep(() => true);

    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);

        if (pull.name) {
          console.log(`Reloaded ${pull.name} (cmd)`);
          client.commands.set(pull.name, pull);
        }

        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.name);
          });
        }
      });
      message.lineReplyNoMention(
        new MessageEmbed()
          .setTitle('<:tickYes:863367013464408084> | Successfully Reloaded!')
          .setDescription(`\n\`\`\`yml\nReloaded ${client.commands.size} Commands!\n\`\`\`\n`)
          .setFooter(`Commands Reloaded and Actioned by ${message.author.tag}`)
          .setColor('#00FF00')
      );
    });
  },
};
