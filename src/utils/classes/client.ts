import { Client, ClientOptions} from 'discord.js';
import BaseCommand from './BaseCommand'
import { ErelaClient } from 'erela.js'

export default class extends Client {

  public commands!: Map<string, any>
  public music!: ErelaClient;

  constructor() {
    super()
    this.commands;
  }



}