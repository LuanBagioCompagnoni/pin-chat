import ContactClass from "../models/classes/ContactClass.js";
import ContactModel from "../models/Contact.js";

export default class ContactService {
    constructor() {
        this.contactClass = new ContactClass(ContactModel);
    }

    async getContactByUserId(userId) {
        return await this.contactClass.getByParam("ownerId", userId);
    }
}