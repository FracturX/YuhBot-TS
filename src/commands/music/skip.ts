import BaseCommand from "../../utils/classes/BaseCommand";

import client from "../../utils/classes/client";
import { Message } from "discord.js";
import { PlayerStore, Player } from 'erela.js';


module.exports = class SkipCommand extends BaseCommand {
    constructor() {
        super("skip", "music");
    }

    async run(client : client, message : Message, args : Array<string>) {
        

        if (message.guild) {
          const guildId = message.guild.id;
          const player : Player = client.music.players.get(guildId)!

          const channel = message.member?.voice.channel;
          if (player && channel) {
              if (player.voiceChannel.id === channel.id) {
                  player?.pause(false)
                      player.stop();
                      message.channel.send(
                          `Skipping... ${player.queue[0].title}`
                      );
                  
              }
          }

        }
        //const player = client.music.players.get(guildId);

    }
};