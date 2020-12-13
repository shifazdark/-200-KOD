

const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => { 
if(message.author.id !== ayarlar.sahip) return message.channel.send(" Bu komutu sadece geliştiricim kullanabilir.");

 const args0 = args[0];
  if(!args0) {
    message.channel.send(message.author.username + ", lütfen bir sunucu **id**'si yaz!")
  } else {
  
 
db.delete(`premod_${args0}`,"deaktif")
message.channel.send("premium başarıyla alındı")
 
}
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['premium-ver'],
    permLevel: 4,
      
}

exports.help = {
    name: 'premiumal',
    description: 'premiumal',
    usage: 'premiumal',

}