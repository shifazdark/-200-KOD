const Discord = require('discord.js');

exports.run = function(client, message, args) {
 let user = message.mentions.users.first();


    if (message.mentions.users.size < 1) return message.reply('**Azını Kıracağım Kişiyi Etiketle Döveyim.**').catch(console.error);

    const oldur=new Discord.RichEmbed()
    .setColor("0x808080")
    .setDescription(message.author.username + ` ${user}` + '** adlı kişiyi, Tokatladı! 🖐️ **')
    .setImage('https://media0.giphy.com/media/deKWTyMOYLkje/giphy.gif')
    .setFooter("MARI BASS", client.user.avatarURL)
    return message.channel.send(oldur);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['tokat-at','tokatat'],
  permLevel: 0
};

exports.help = {
  name: 'tokatat',
  description: 'Etiketlediğin kişiye tokat atar!',
  usage: 'tokatat'
};