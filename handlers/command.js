const { readdirSync } = require("fs");
const ascii = require("ascii-table");

const table = new ascii("Commands").setHeading("Command", "Load status"); // create the table

module.exports = (client) => {
  readdirSync("./commands/").forEach((dir) => {
    readdirSync(`./commands/${dir}/`).forEach((file) => {
      if (!file.endsWith(".js")) return; // filter the file

      const command = require(`../commands/${dir}/${file}`); // load command from file

      // filter invalid command
      if (!command.name)
        return table.addRow(
          file,
          "FAIL -> Missing a command.name, or command.name is not a string."
        );

      // set command to bot
      client.commands.set(command.name, command);

      // set command aliases
      if (command.aliases && Array.isArray(command.aliases))
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );

      table.addRow(file, "OK");
    });
  });
  console.log(table.toString()); // write the table to console, idk why i comment this thing lol
};
