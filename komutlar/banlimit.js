const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async(yashinu, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir!')
  if(args[0] === "0" || args[0] === "sıfırla") {
    await db.delete(`banlimit_${message.guild.id}`)
    message.reply('Ban limit özelliği başarıyla devre dışı bırakıldı!')
    return
  }
  if(!args[0] || isNaN(args[0])) return message.channel.send(`Ban limit sayısını belirtmelisin! (Özelliği devre dışı bırakmak isterseniz **0** yazmalısınız!)`);
  await db.set(`banlimit_${message.guild.id}`, args[0])
  message.reply(`Sunucunun ban limitini başarıyla **${args[0]}** olarak ayarladım!`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'banlimit',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};