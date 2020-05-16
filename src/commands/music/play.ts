import client from "../../utils/classes/client";
import { Message, MessageEmbed } from "discord.js";
import { SearchResult } from "erela.js";

const carmelSongs = {
  "Go With It":
    "https://www.youtube.com/watch?v=hWVLR2WatBo",
  CarmelAlbum:
    "https://www.youtube.com/playlist?list=OLAK5uy_kZRJb7_UvI4fOA8P9h2zE-ORzj3hDCyN0",
  "505Album":
    "https://www.youtube.com/watch?v=ztzvlpPY1_w&list=OLAK5uy_lNbNFl4zs9hhKriMWSxZ4dsbByQUxVWrA&index=2&t=0s",
  Survival: "https://youtu.be/s0_8THQ9LI4",
  Maxima: "https://youtu.be/KaidiP1giQ8",
  "Man Up": "https://youtu.be/_zgHuXGBKNQ",
  Parachute: "https://youtu.be/uD4rHiT7uCg",
  "Cowboy Bebop": "https://youtu.be/E_IsrpGBrMA",
  Backpack: "https://youtu.be/F7c7BhSN_tw",
  Heart: "https://youtu.be/b7nz2_6-bzY",
  Roundabouts: "https://youtu.be/Iw5MnS2fcrc",
  Conditioned: "https://youtu.be/zXXGK2tX0qE",
  Perspectives: "https://youtu.be/j5ZJNrNRdac",
  "Sunshine:": "https://youtu.be/x6ty1m3NEvk",
  Peace: "https://youtu.be/tEYCfadMOso",
  "Fight or Flight": "https://youtu.be/fPOG5zcVym0",
  Skydream: "https://youtu.be/zs2RmEB9YKg",
  "Free Bird": "https://youtu.be/IpxSYJgC_zA",
  Carmel: "https://youtu.be/yh7IGrqVSSE",
  "Dead To Me": "https://youtu.be/ztzvlpPY1_w",
  Committed: "https://youtu.be/rWbi9ulSUmE",
  Raptor: "https://youtu.be/wRtzZ4hwKAY",
  "Picture Me": "https://youtu.be/5hqxJoZIcVs",
  "A+": "https://youtu.be/QHg5ncpwdho",
  "Out Now": "https://youtu.be/y8JSojvhXs4",
  "A Little Bit": "https://youtu.be/DVR7QBw4gLY",
  "Fake Friends": "https://youtu.be/w6SC5VBSHrI",
  "Nothing New": "https://youtu.be/AjT_9tx7hYA",
  "You and I": "https://youtu.be/o-OmTNl7pYs",
  "Oh Well": "https://youtu.be/8Dgx5OlDhrQ",
  "Flight Risk": "https://youtu.be/E2g7R4XBzms",
  "lofi Survival": "https://www.youtube.com/watch?v=wLeR7RAuBxI",
  "lofi Maxima": "https://www.youtube.com/watch?v=vbJshzVPtqE",
  "lofi Man Up": "https://www.youtube.com/watch?v=a4re3kTQiV0",
  "lofi Parachute": "https://www.youtube.com/watch?v=wHwhAmk-aHM",
  "lofi Cowboy Bebop": "https://www.youtube.com/watch?v=dtJj-2Pd5dM",
  "lofi Backpack": "https://www.youtube.com/watch?v=1VTa2oR2gvQ",
  "lofi Heart": "https://www.youtube.com/watch?v=NyU6UoEQY28",
  "lofi Roundabouts": "https://www.youtube.com/watch?v=M74ktVvhoWI",
  "lofi Conditioned": "https://www.youtube.com/watch?v=pl3ePnufosE",
  "lofi Perspectives": "https://www.youtube.com/watch?v=isKeLCFMuyI",
  "lofi Sunshine:": "https://www.youtube.com/watch?v=4h65fTr4fFY",
  "lofi Peace": "https://www.youtube.com/watch?v=NuKDH6NDIys",
  "lofi Fight or Flight": "https://www.youtube.com/watch?v=j5XYNB5ryek",
  "lofi Skydream": "https://www.youtube.com/watch?v=alJbA8hyVcU",
  "lofi Free Bird": "https://youtu.be/IpxSYJgC_zA",
  "lofi Carmel": "https://www.youtube.com/watch?v=08RDmCCSKlk",
  "One Love": "https://www.youtube.com/watch?v=i85fnZor7AA",
};

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