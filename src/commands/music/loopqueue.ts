import BaseCommand from "../../utils/classes/BaseCommand";
import { Message } from "discord.js";
import Client from '../../utils/classes/client'

module.exports = 
  class LoopQueueCommand extends BaseCommand {
    constructor() {
      super("loopqueue", "music")
    }

    async run(client: Client, message: Message, args: Array<string>) {
      const player = client.music.players.get(message.guild!.id)

      if (player) {
        const channel = message.member?.voice.channel;
            if (player && channel) {
              if (player.voiceChannel.id === channel.id) {
                if (player.trackRepeat === true) {
                  player.setQueueRepeat(false)
                  message.channel.send("Queue has been unlooped.")
                }
                else if (player.trackRepeat === false) {
                  player.setQueueRepeat(true)
                  message.channel.send("Queue has been looped.")
                }
              }
            }
                
      }
    }
  }
