const Discord = require('discord.js');
const snekfetch = require("snekfetch");
exports.run = async (client, message, args) => {
  if (!args[0]) { 
    return message.channel.send(":x: EndlessLovecode'ye ne göndermek istersin?") }
  snekfetch.post("https://endlesslove-code.glitch.me/documents").send(args.slice(0).join(" ")).then(body => {
    message.channel.send(":white_check_mark: Yazınızı EndlessloveCode ye Gönderdim: https://endlesslove-code.glitch.me/" + body.body.key);
       });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hastebin'],
  permLevel: 0
};

exports.help = {
  name: 'endlesslovebin',
  description: 'İstediğiniz Yazıyı endlesslove ye Yükler.',
  usage: 'endlesslove'
};