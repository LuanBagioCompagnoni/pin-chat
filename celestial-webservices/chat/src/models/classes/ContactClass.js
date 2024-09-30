import BaseClass from "./BaseClass.js";
import Contact from "../Contact.js";
import validationError from "ErrorHandler-Package/errors/ValidationError.js";

export default class ContactClass extends BaseClass {
    constructor() {
        super(Contact)
    }

    validate(data) {
        if(!data.ownerId) throw validationError("Dono do contato não fornecido!");
        if(!data.contactDestinationId) throw validationError("O destinatário do contato não foi fornecido!");
        if(!data.contactName) throw validationError("Nome do contato não fornecido!");
        if(!data.createDate) data.createDate = new Date();
    }
}