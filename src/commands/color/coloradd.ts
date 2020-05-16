import BaseCommand from '../../utils/classes/BaseCommand'
import client from '../../utils/classes/client';
import { Message, Role } from 'discord.js';

module.exports = class coloraddCommand extends BaseCommand {
  constructor() {
      super("coloradd", "color");
  }

  async run(client : client, message : Message, cmdArgs : Array<string>) {
      if (message.member?.hasPermission("ADMINISTRATOR") === false) {
          message.channel.send("Ask a mod to add the role for you.");
          return;
      }
      let args = message.content.substring(10);
      const channel = message.channel;
      let roleName = args.split(", ");
      console.log(roleName);
      let guild = message.guild!;
      let cache = guild.roles.cache;
      let rolesexist = cache.find(
          (rolesexist) =>
              rolesexist.name.toLowerCase() === roleName[0].toLowerCase()
      );
      console.log(roleName[0]);
      let r : Role = cache.find((r) => r.name === "YuhBot")!;
      console.log(r.position);

      if (rolesexist) {
          await message.channel.send("Role already exists.");
      } else {
          guild.roles
              .create({
                  data: {
                      name: "Color - " + roleName[0],
                      color: roleName[1],
                      permissions: [],
                      hoist: false,
                      mentionable: true,
                      position: r.position - 1,
                  }
              })
              .then()
              .catch(console.error);
              channel.send("ok done nerd")
      }
  }
};