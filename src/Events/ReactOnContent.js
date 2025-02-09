const client = require('../../index');

const channel = '1335336518981521459';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        message.react('🇮');
        message.react('🇰');
        message.react('🇿');
        message.react('❗');
    }
});
