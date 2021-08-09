const { glob } = require("glob");
const { promisify } = require("util");
const client = require("../index");

const globPromise = promisify(glob);

module.exports = async (client) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  const formatString = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
    if (file.aliases && Array.isArray(file.aliases)) {
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name))
    }
    console.log(formatString(file.name), `Loaded`)
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );
  const arrayOfSlashCommands = [];

  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;

    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file);
  });

  client.on("ready", async () => {
    await client.guilds.cache
      .get("849130218975526922")
      .commands.set(arrayOfSlashCommands);
  });
};
