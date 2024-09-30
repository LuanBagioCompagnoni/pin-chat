import Contact from "../models/Contact.js";

export default class ContactService {
    static async getContact(filter) {
        return await Contact.find(filter);
    }
}