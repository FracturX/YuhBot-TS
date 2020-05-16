import BaseCommand from "../../utils/classes/BaseCommand";

import client from "../../utils/classes/client";
import { Message } from "discord.js";
import { Player } from 'erela.js';


module.exports = class PauseCommand extends BaseCommand {
  constructor() {
    super("pause", "music");
  }

  async run(client: client, message: Message, args: Array<string>) {


    if (message.guild) {
      const guildId = message.guild.id;
      const player: Player = client.music.players.get(guildId)!

      const channel = message.member?.voice.channel;
      if (player && channel) {
        if (player.voiceChannel.id === channel.id) {
          switch (player.playing) {
            case true:
              player.pause(true);
              message.channel.send(
                `Skipping... (do ?pause to unpause again) ${player.queue[0].title}`
              );
              break;

            case false:
              player.pause(false)
              if (!player.queue) return;
              message.channel.send(
                `Unskipping ${player.queue[0].title}`
              );
              break;
          }



        }
      }

    }
    //const player = client.music.players.get(guildId);

  }
};