const client = require('../../index');

const channel = '1335332947514888299';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('✨');
        }
        if (!message.author.bot) return;
    }
});
