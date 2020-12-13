const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let mesaj = args.slice(0).join(' ');
  if(mesaj.length < 5) return message.channel.send(' Sayaç Hoşgeldin Mesaj Sistemi İçin En Az 5 Karakter Belirtebilirsin. `Örnek: c!sayac-bb-msg -uyetag-, Sunucumuzdan Ayrıldı, -hedefuye- Kişiye Ulaşabilmek İçin -kalanuye- Kişi Kaldı. **-uyesayisi-** Kişiyiz.`')
  
 message.channel.send(' Sayaç Görüşürüz mesajını `'+mesaj+'` Olarak ayarladım.') 
 db.set(`sayacbbmsj_${message.guild.id}`, mesaj)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['sayac-bb-msg'], 
  permLevel: 0
};

exports.help = {
  name: 'sayac-bb-msg',
  description: 'sayaç ayrılan kişi mesajı ayarlamanızı sağlar', 
  usage: 'sayac-bb-msg'
};