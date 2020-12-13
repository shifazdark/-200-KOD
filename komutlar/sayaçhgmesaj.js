const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let mesaj = args.slice(0).join(' ');
  if(mesaj.length < 5) return message.channel.send(' Sayaç Hoşgeldin Mesaj Sistemi İçin En Az 5 Karakter Belirtebilirsin. `Örnek: Örnek: !sayac-hg-msg -server-, Sunucumuza Hoşgeldin, -uye-! -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı!, **-uyesayisi-** Kişiyiz.`')
  
 message.channel.send('Sayaç Hoşgeldin mesajını `'+mesaj+'` Olarak ayarladım.') 
 db.set(`sayachgmsj_${message.guild.id}`, mesaj)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['sayac-hg-msg'], 
  permLevel: 0
};

exports.help = {
  name: 'sayac-hg-msg',
  description: 'sayaç Hoşgeldin mesajı ayarlamanızı sağlar', 
  usage: 'sayac-hg-msg'
};