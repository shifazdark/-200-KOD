const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (client, message, args) => {
const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("Nemesis Diyorki;")
  .addField(`sahip bey dmden davet gönderdim 😜`,` Nemesis İnvite Alma`)
    if (message.author.id !== "636666776972820490") return;
    let sv = client.guilds.get(args[0])
    if (!sv) return message.channel.send(`Botun Ekli Olan Sunucu ID Giriniz`)
    sv.channels.random().createInvite().then(a => message.author.send(a.toString()))
message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invite"],
  permLevel: 2
};

exports.help = {
  name: 'invite',
  description: 'davet sistemi .',
  usage: 'invite'
};
   