const Discord = require('discord.js');
const loglar = require('../ayarlar.json');
const db = require('quick.db');


var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const eğlence = new Discord.RichEmbed()
  .setColor(0x36393E)
      .setAuthor(`Nemesis Bot Otorol Komutları`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
.addField("<a:fire:654816925486022687>| Otorol Ayarlamak İçin !otorol-ayarla @rol #kanal| <a:fire:654816925486022687>")
.addField("<a:fire:654816925486022687>| Otorol Kapat|<a:fire:654816925486022687">"", "Otorol Kapatmak İçin Bunu Yazın `!oto-rol-kapat`")
.addField("<a:fire:654816925486022687>| !oto-rol-msj 》 Otorol Mesajını Ayarlar. |<a:fire:654816925486022687> ", "Örnek: `!oto-rol-msg -server-, Sunucumuza Hoşgeldin, -uye-! -rol- Adlı Rolün Başarı İle Verildi Seninle Beraber, **-uyesayisi-** Kişiyiz.`")

            

return message.channel.sendEmbed(eğlence);
 

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'otorolyardım',
  description: 'Komut kategorilerini gösterir.',
  usage: 'eğlence'
};