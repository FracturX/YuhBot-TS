import BaseCommand from '../../utils/classes/BaseCommand'
import client from '../../utils/classes/client';
import { Message } from 'discord.js';

module.exports = class LeaveChannelCommand extends BaseCommand {
    constructor() {
        super("stop", "music");
    }

    async run(client : client, message : Message, args : Array<string>) {
        const id = message.guild?.id!;
        const player = client.music.players.get(id);
        const channel = message.member!.voice.channel;
        if (player && channel) {
            if (player.voiceChannel.id === channel.id) {
                client.music.players.destroy(id);
            }
        }
    }
};