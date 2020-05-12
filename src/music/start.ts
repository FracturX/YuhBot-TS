import { ErelaClient, Player, Track } from "erela.js";

import BaseEvent from '../utils/classes/BaseEvent';



module.exports = class TrackStartEvent extends BaseEvent {
    constructor() {
        super("trackStart");
    }

    async run(client : ErelaClient, player : Player, track : Track) {
        player.textChannel.send(`Now playing: ${track.title}`);
    }
};