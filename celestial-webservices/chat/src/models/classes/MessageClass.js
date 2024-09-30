import BaseClass from "./BaseClass.js";
import {ValidationError} from "ErrorHandler-Package";

export default class MessageClass extends BaseClass {
    constructor(Model) {
        super(Model);
    }

    validate(data){
        if(!data.contactId) throw new ValidationError("contactId não fornecido!");
        if((!data.content || data.content.lenth === 0) && !data.file) throw new ValidationError("Conteúdo da mensagem não fornecido!");
        if(!data.type) throw new ValidationError("Tipo da mensagem não fornecido!");
        if(!data.ownerId) throw new ValidationError("Dono da mensagem não fornecido!")
    }
}