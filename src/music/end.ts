import { ErelaClient, Player } from "erela.js";

  
import BaseEvent from '../utils/classes/BaseEvent';

module.exports = class TrackStartEvent extends BaseEvent {
  constructor () {
    super('queueEnd');
  }

  async run (client : ErelaClient, player : Player) {
    player.textChannel.send("Queue has ended.")
    client.players.destroy(player.guild.id);
  }
}