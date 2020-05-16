import client from "../../utils/classes/client";
import { Message, MessageEmbed, ReactionEmoji, User, MessageReaction } from "discord.js";
import BaseCommand from '../../utils/classes/BaseCommand';
import { Queue } from "erela.js";



module.exports = class ViewQueueCommand extends BaseCommand {
  constructor () {
    super('queuelist', 'music');
  }

  async run (client : client, message : Message, args : Array<string>) {
    const player = client.music.players.get(message.guild!.id);
    if (player) {
      
      let currentPage = 0;
      const embeds = generateQueueEmbed(player.queue, client);
      const queueEmbed = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
      await queueEmbed.react('⬅️');
      await queueEmbed.react('➡️');
      await queueEmbed.react('❌');

      const filter = (reaction : MessageReaction, user : User) => ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && (message.author.id === user.id);
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on('collect', async (reaction, user) => {
        // If there are 2 embeds.
        if (reaction.emoji.name === '➡️') {
          if (currentPage < embeds.length-1) {
            currentPage++;
            queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          } 
        } else if (reaction.emoji.name === '⬅️') {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`Current Page ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          console.log('Stopped collector..');
          await queueEmbed.delete();
        }
      });
    }
  }
}

function generateQueueEmbed(queue : Queue, client : client) {
  const embeds = [];
  let k = 10;
  for(let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map(track => `${++j}) [${track.title}](${track.uri})`).join('\n');
    const embed = new MessageEmbed()
      .setTitle('Queue')
      .setAuthor("YuhBot", client.user?.displayAvatarURL({format: 'jpg', dynamic: true})!, 'https://yuhinternational.azurewebsites.net')
      .setDescription(`**[Current Song: ${queue[0].title}](${queue[0].uri})**\n${info}`)
      .setColor('E86ED2');
    embeds.push(embed);
  }
  return embeds;
}