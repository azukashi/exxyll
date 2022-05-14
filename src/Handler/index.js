const { glob } = require('glob');
const { promisify } = require('util');

const globPromise = promisify(glob);

module.exports = async (client) => {
	// Commands
	const commandFiles = await globPromise(
		`${process.cwd()}/src/Commands/**/*.js`
	);
	const formatString = (str) =>
		`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split('/');
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
		if (file.aliases && Array.isArray(file.aliases)) {
			file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
		}
		console.log(formatString(file.name), `Loaded`);
	});

	// Events
	const eventFiles = await globPromise(`${process.cwd()}/src/Events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(`${process.cwd()}/src/Slash/*/*.js`);
	const arrayOfSlashCommands = [];

	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
		if (file.userPermissions) file.defaultPermission = false;
		arrayOfSlashCommands.push(file);
	});

	client.on('ready', async () => {
		// For testing purposes, Set the Slash Commands to Exxyll Development Server only.
		// const guild = client.guilds.cache.get('849130218975526922');
		// try {
		//   await guild.commands.set(arrayOfSlashCommands);
		// } catch (err) {
		//   console.log(err)
		// }
		// .then((cmd) => {
		//   const getRoles = (commandName) => {
		//     const permissions = arrayOfSlashCommands.find(
		//       (x) => x.name === commandName
		//     ).userPermissions;
		//     if (!permissions) return null;
		//     return guild.roles.cache.filter(
		//       (x) => x.permissions.has(permissions) && !x.managed
		//     );
		//   };

		//   const fullPermissions = cmd.reduce((accumulator, x) => {
		//     const roles = getRoles(x.name);
		//     if (!roles) return accumulator;

		//     const permissions = roles.reduce((a, v) => {
		//       return [
		//         ...a,
		//         {
		//           id: v.id,
		//           type: 'ROLE',
		//           permission: true,
		//         },
		//       ];
		//     }, []);

		//     return [
		//       ...accumulator,
		//       {
		//         id: x.id,
		//         permissions,
		//       },
		//     ];
		//   }, []);
		//
		//   guild.commands.permissions.set({ fullPermissions });
		// });

		// To set the slash to each single guild, Use this.
		try {
			await client.application.commands.set(arrayOfSlashCommands);
		} catch (err) {
			console.log(err);
		}
		// .then((cmd) => {
		//   const getRoles = (commandName) => {
		//     const permissions = arrayOfSlashCommands.find(
		//       (x) => x.name === commandName
		//     ).userPermissions;
		//     if (!permissions) return null;
		//     return guild.roles.cache.filter(
		//       (x) => x.permissions.has(permissions) && !x.managed
		//     );
		//   };

		//   const fullPermissions = cmd.reduce((accumulator, x) => {
		//     const roles = getRoles(x.name);
		//     if (!roles) return accumulator;

		//     const permissions = roles.reduce((a, v) => {
		//       return [
		//         ...a,
		//         {
		//           id: v.id,
		//           type: 'ROLE',
		//           permission: true,
		//         },
		//       ];
		//     }, []);

		//     return [
		//       ...accumulator,
		//       {
		//         id: x.id,
		//         permissions,
		//       },
		//     ];
		//   }, []);

		//   guild.commands.permissions.set({ fullPermissions });
		// });
	});
};
