import BaseEvent from "../../utils/classes/BaseEvent";
import client from "../../utils/classes/client";
import { Message } from 'discord.js'


module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message')
    }

    async run(client: client, message: Message) {

        console.log(message.content)

        const prefix = '?'
        const usedprefix = message.content.slice(0, prefix.length)


        if (prefix === usedprefix) {
            console.log('yes')
            const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs)
            }
        }
    }
}