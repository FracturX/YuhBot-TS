import BaseCommand from '../../utils/classes/BaseCommand'
import { Message } from 'discord.js';
import client from '../../utils/classes/client';

module.exports = class colormeCommand extends BaseCommand {
    constructor() {
        super("colorme", "color");
    }

    async run(client : client, message : Message, cmdArgs : Array<string>) {
        let args = message.content.toLowerCase().substring(9);
        let guild = message.guild!;
        let { cache } = guild.roles;
        let rolesexist = cache.find(
            (rolesexist) => rolesexist.name.toLowerCase() === "color - " + args
        );
        let rolefind = message.member!.roles.cache.find((rolefind) =>
            rolefind.name.startsWith("Color -")
        );

        if (rolesexist) {
            if (message.member!.roles.cache.has(rolesexist.id)) {
                await message.channel.send(
                    "Member already has role. Command not executed."
                );
                return;
            }

            if (rolefind) {
                message.member!.roles.remove(rolefind).catch((err) => {
                    console.log(err);
                });
            }

            message.channel.send("lol ok nerd");
            message.member!.roles.add(rolesexist);
        } else {
            message.channel.send("Not a valid color role.");
        }
    }
  }