import BaseEvent from '../utils/classes/BaseEvent';
import { ErelaClient, Node } from 'erela.js';


module.exports = class NodeConnectEvent extends BaseEvent {
    constructor() {
        super('nodeConnect')
    }

    async run (client : ErelaClient, node : Node) {
        console.log('Connection Established with the Database.')
    }
}