const Discord = require('discord.js');
module.exports = member => {
    const channel = member.guild.channels.find('name', 'xxxxxxxş');
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle('Üye Ayrıldı;')
   .setDescription(`Sunucudan ayrıldı [${member.guild.memberCount} üye]!`)
   .setFooter('Nemesis')
   .setTimestamp()
   channel.send(embed);
};
