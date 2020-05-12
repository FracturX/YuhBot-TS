import BaseCommand from "../utils/classes/BaseCommand";
import client from "../utils/classes/client";
import { Message } from "discord.js";

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("test", "testing");
  }


  async run(client: client, message: Message, args: Array<string>) {
    console.log(typeof args);
    message.reply("hello!" + args);
    args.forEach(element => {
      message.reply(element);
    });
  }
};
