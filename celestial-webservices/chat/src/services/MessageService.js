import MessageModel from '../models/Message.js';
import MessageClass from "../models/classes/MessageClass.js";

export default class MessageService {
    constructor() {
        this.messageClass = new MessageClass(MessageModel);
    }

    async listForContact(contactId) {
        return await this.messageClass.getByParam("contactId", contactId);
    }

    async create(message) {
        await this.messageClass.create(message);
    }

    async update(id, content) {
        return await this.messageClass.updateById(id, content);
    }

    async delete(id) {
        return await this.messageClass.delete(id);
    }
}
