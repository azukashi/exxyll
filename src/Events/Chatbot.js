const client = require('../../index');
const fetch = require('node-fetch');

client.on('messageCreate', async message => {
    if (message.channel.id === '869763459561173032') {
        if (message.author.bot) return;
        if (!message.author.bot) {
            fetch(
                `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(message.content)}&uid=${message.author.id}`
            )
                .then(res => res.json())
                .then(body => {
                    message.reply({ content: body.response });
                });
        }
    }
});
