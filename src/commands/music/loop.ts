import BaseCommand from "../../utils/classes/BaseCommand";
import { Message } from "discord.js";
import Client from '../../utils/classes/client'

module.exports = 
  class LoopCommand extends BaseCommand {
    constructor() {
      super("loop", "music")
    }

    async run(client: Client, message: Message, args: Array<string>) {
      const player = client.music.players.get(message.guild!.id)

      if (player) {
        const channel = message.member?.voice.channel;
            if (player && channel) {
              if (player.voiceChannel.id === channel.id) {
                if (player.trackRepeat === true) {
                  player.setTrackRepeat(false)
                  message.channel.send("Unlooped the current track.")
              } else if (player.trackRepeat === false) {
                  player.setTrackRepeat(true) 
                  message.channel.send("Looped the current track.")

                }
                
              }
            }
                
      }
    }
  }
