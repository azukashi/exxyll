const { Client, Message, MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: 'Evaluate some code to evaluate',
    usage: '<code>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '788260234409672754') return;

        const code = args.join(" ");
        if(!code) return message.reply('Please provide some code to evaluate!');

        try {
            const result = await eval(code);
            let output = result;

            if(typeof result !== 'string') {
                output = inspect(result);
            }

            message.channel.send(output, { code : 'js'});
        } catch (error) {
            console.log(error);
            message.channel.send(`Evaluated content is too long to display.\n\nError : ${error}`);
        };
    },
};