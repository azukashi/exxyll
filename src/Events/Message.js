const client = require('../../index');
const Levels = require('discord-xp');

client.on('messageCreate', async message => {
    const p = await client.prefix(message);
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(p)) return;

    const random = Math.floor(Math.random() * 34) + 1;
    const hasLevelledUp = await Levels.appendXp(message.author.id, message.guild.id, random);
    if (hasLevelledUp) {
        // const user = await Levels.fetch(message.author.id, message.guild.id);
        // message.channel.send(`Congratulation ${message.author}! You've been levelled up to level ${user.level}.`);
    }

    const [cmd, ...args] = message.content.slice(p.length).trim().split(' ');

    let command = client.commands.get(cmd.toLowerCase());
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    await command.run(client, message, args);

    // Permission Handling
    const userperm = message.member.permissions.has(command.userperm) || 'SEND_MESSAGES';
    const botperm = message.guild.me.permissions.has(command.botperm) || 'SEND_MESSAGES';
    if (!userperm)
        return message.reply({
            content: `You need \`${command.userperm || []}\` Permissions`,
        });
    if (!botperm)
        return message.reply({
            content: `I need \`${command.botperm || []}\` Permissions`,
        });
});
