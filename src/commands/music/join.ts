
import BaseCommand from  "../../utils/classes/BaseCommand";

import Client from '../../utils/classes/client'
import { Message } from "discord.js";

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super("join", "music");
    }

    async run(client : Client, message : Message, cmdArgs : Array<string>) {

        if (message.member) {

          const channel = message.member.voice.channel

          if (channel) {
            const player = client.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel,
            });

        } else {
            message.channel.send("Please join a voice channel.");
        }
        }


    }
};