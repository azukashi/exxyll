const client = require('../index');
const db = require('quick.db');
const config = require('../config.json')
const prefix = config.prefix

client.on('message', async message =>{
    if(message.author.bot) return;
    // if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
    //     const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
    //     await db.delete(`afk-${message.author.id}+${message.guild.id}`)
    //     message.reply(`Your afk status have been removed (${info})`)
    // }
    // //checking for mentions
    // if(message.mentions.members.first()) {
    //     if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
    //         message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
    //     }else return;
    // }else;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})