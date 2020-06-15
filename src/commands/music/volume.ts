import BaseCommand from "../../utils/classes/BaseCommand";
import { Message } from "discord.js";
import Client from '../../utils/classes/client'

module.exports = 
  class VolumeCommand extends BaseCommand {
    constructor() {
      super("volume", "music")
    }

    async run(client: Client, message: Message, args: Array<string>) {
      let vol = args[0] || 1000
      if (vol > 1000) {
        vol = 1000;
      }
      const player = client.music.players.get(message.guild!.id)

      if (player) {
        const channel = message.member?.voice.channel;
            if (player && channel) {
              player.setVolume(+vol)
              message.channel.send(`Current Volume is now: ${player.volume}`)
            }
                
      }
    }
  }
