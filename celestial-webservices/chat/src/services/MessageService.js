import MessageModel from '../models/Message.js';
import MessageClass from "../models/classes/MessageClass.js";

export default class MessageService {
    constructor() {
        this.messageClass = new MessageClass(MessageModel);
    }

    async listForChat(originUserId, destinationUserId) {
        return await this.messageClass.getMessagesForChat(originUserId, destinationUserId);
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

    async getLastMessageByContact(originUserId, destinationUserId) {
        return await this.messageClass.getLastMessageByContact(originUserId, destinationUserId);
    }
}
