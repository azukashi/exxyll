const client = require('../../index');

const channel = '1337408113359458405';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('🥺');
        }
        if (!message.author.bot) return;
    }
});
