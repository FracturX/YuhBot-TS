import { ErelaClient, Node } from "erela.js";

import BaseEvent from '../utils/classes/BaseEvent';

module.exports = class NodeErrorEvent extends BaseEvent {
  constructor () {
    super('nodeError');
  }

  async run (client : ErelaClient, node : Node, error: Error) {
    console.log('An error has occured');
    console.log(error.message);
  }
}