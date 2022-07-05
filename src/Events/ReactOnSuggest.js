const client = require('../../index');

const channel = '849139267471933502';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('👍');
            message.react('👎');
            message.react('🤷');
        }
        if (!message.author.bot) return;
    }
});
