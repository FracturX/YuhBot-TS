import client from "../../utils/classes/client";
import { Message, MessageEmbed } from "discord.js";
import { SearchResult } from "erela.js";
import { carmelSongs } from '../../utils/constants'



let calSongs = new Map<string, string>();

for (const [i, v] of Object.entries(carmelSongs)) {
  calSongs.set(i, v)
}

import BaseCommand from "../../utils/classes/BaseCommand";

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super("play", "music");
  }

  async run(client: client, message: Message, args: Array<string>) {
    let query = args.join(" ");
    console.log(query);

    const { channel } = message.member!.voice;

    if (channel) {
      try {



        let searchResults: SearchResult;

        if (query in carmelSongs) {
          searchResults = await client.music.search(
            calSongs.get(query)!,
            message.author
          );
        } else {
          searchResults = await client.music.search(query, message.author)
        }



        switch (searchResults.loadType) {
          case 'PLAYLIST_LOADED':
            searchResults.playlist.tracks.forEach(element => {
              const player = client.music.players.get(message.guild!.id);
              player!.queue.add(element)

              if (!player!.playing) player!.play()
            });
            let i = 0;
            const tracksInfo = searchResults.playlist.tracks
              .map((r) => `${++i}) ${r.title} - ${r.uri}`)
              .join("\n");
            let embed = new MessageEmbed()
            embed.setTitle(searchResults.playlist.info.name + " has been queued.")
            embed.setDescription(tracksInfo)
            embed.setColor('E86ED2')
            .setAuthor("YuhBot", client.user?.displayAvatarURL({format: 'jpg', dynamic: true})!, 'https://yuhinternational.azurewebsites.net');
            message.channel.send(embed)
            break;

          default:
            let final = searchResults.tracks[0];

            console.log(final.title);
            const player = client.music.players.get(message.guild!.id);
            const track = final;
            player!.queue.add(track);
            let embed2 = new MessageEmbed()
            .setDescription(final.title + " has been queued.")
            .setAuthor("YuhBot", client.user?.displayAvatarURL({format: 'jpg', dynamic: true})!, 'https://yuhinternational.azurewebsites.net')
            .setColor('E86ED2')
          message.channel.send(embed2)
            if (!player!.playing) player!.play();

            break;
        }



      } catch (error) {
        console.log(error)
        const player = client.music.players.spawn({
          guild: message.guild,
          voiceChannel: channel,
          textChannel: message.channel,
        });

        message.channel.send('try running the command again now.')
      }
    }

  }
};