const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');

module.exports = async member => {
    var randomMsg = [
                    "Sunucuya Giriş yaptı",      
                    ];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]

  let msj = await db.fetch(`girisM_${member.guild.id}`)
  if (!msj) msj = `{uye}, ${randomMsg_integer}`
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  
  const canvas = Canvas.createCanvas(360, 240);
  const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/573582370310062091/626167776754663474/giris.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `25px "S&S Nickson One"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username.toUpperCase()}`, 170, 210);

  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill()
  ctx.lineWidth = 4;
    ctx.arc(112 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 112, 55, 110, 110);
  
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'Hoşgeldin.png');
  member.guild.channels.get(memberChannel).send(attachment)
  member.guild.channels.get(memberChannel).send(msj.replace('{uye}', member).replace('{sunucu}', member.guild.name))
  if (member.user.bot) return member.guild.channels.get(memberChannel).send(`🤖 Bu bir bot, ${member.user.tag}`)
  
}