import BaseClass from "./BaseClass.js";
import { ValidationError } from "ErrorHandler-Package";

export default class ContactClass extends BaseClass {
    constructor(Model) {
        super(Model)
    }

    validate(data) {
        if(!data.ownerId) throw ValidationError("Dono do contato não fornecido!");
        if(!data.contactDestinationId) throw ValidationError("O destinatário do contato não foi fornecido!");
        if(!data.contactName) throw ValidationError("Nome do contato não fornecido!");
        if(!data.createDate) data.createDate = new Date();
    }
}