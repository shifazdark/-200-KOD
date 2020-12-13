const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (bot, message, args) => {
   const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('bot ismi Team\'s', bot.user.avatarURL)
  .addField("» :spy: Botun Sahibleri", "<@636666776972820490> <@639430589493018644> ")
  .addField(':desktop: Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2)) 
  .addField("» Çalışma süresi", seksizaman)
  .addField("» Kullanıcılar", bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("» :clipboard: Sunucular", bot.guilds.size.toLocaleString(), true)
  .addField("» Kanallar", bot.channels.size.toLocaleString(), true)
  .addField("» Discord.JS sürüm", "v"+Discord.version, true)
  .addField(`» Node.JS sürüm`, `${process.version}`, true)
  .addField("» Ping", bot.ping+" ms", true)
  .addField(':book: Kütüphanesi;', `Discord.js`)
  .addField("**❯ Bot Davet**", " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=654061697606090752&scope=bot&permissions=8)", )
  .addField("**❯ Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/fw3nNEK)", )

  return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot istatistik",
  usage: "istatistik"
};
   