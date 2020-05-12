require("dotenv").config();
console.log('started');
import Client from './utils/classes/client'
import { ErelaClient } from 'erela.js';

const token = process.env.bwap;
const client = new Client();
let poop = new Map()

import { registerCommands, registerEvents, registerMusicEvents } from './utils/register'





(async () => {
    await client.login(token);
    client.music = new ErelaClient(client, [
      {
        host: process.env.HOST!,
        port: +process.env.PORT!,
        password: process.env.PASSWORD!
      }
  ]);
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await registerMusicEvents(client.music, "../music")
})();


