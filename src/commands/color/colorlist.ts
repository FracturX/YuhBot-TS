import BaseCommand from '../../utils/classes/BaseCommand'
import client from '../../utils/classes/client';
import { Message } from 'discord.js';
import { generate, dataUrl } from 'text-to-image';



module.exports = class colorlistCommand extends BaseCommand {
    constructor() {
        super("colorlist", "color");
    }

    sleep(ms : number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run(client : client, message : Message, cmdArgs : Array<string>) {
      generate('Lorem ipsum dolor sit amet')
      .then((dataUri : dataUrl) => {
        console.log(dataUri);
      });
        const { MessageEmbed } = require("discord.js");
        await message.channel.send("lol ok nerd");
        let guild = message.guild!;

        let role = guild.roles.cache.filter((role) =>
            role.name.startsWith("Color -")
        );

        if (role) {
          

          
            let finalMessage = role.forEach((finalMessage) => {
                let embed = new MessageEmbed()
                    .setColor(finalMessage.color)
                    .addField("Color", finalMessage.name);
                    
                      message.channel.send(embed); 
                      console.log("yep");
                      this.sleep(2000)
                    


                
            });
          
        }
    }
};