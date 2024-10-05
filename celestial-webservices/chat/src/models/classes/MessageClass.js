import BaseClass from "./BaseClass.js";
import {ValidationError} from "ErrorHandler-Package";

export default class MessageClass extends BaseClass {
    constructor(Model) {
        super(Model);
        this.model = Model;
    }

    async getMessagesForChat(originUserId, destinationUserId) {
        return await this.model.find({
            $or: [
                { originUserId: originUserId, destinationUserId: destinationUserId },
                { originUserId: destinationUserId, destinationUserId: originUserId }
            ]
        });
    }

    async getLastMessageByContact(originUserId, destinationUserId) {
        return await this.model.findOne(
            {
                $or: [
                    {destinationUserId: destinationUserId, originUserId: originUserId},
                    {destinationUserId: originUserId, originUserId: destinationUserId}
                ]
            }
        ).sort({ date: -1 }).limit(1);
    }



    validate(data){
        if(!data.originUserId) throw new ValidationError("originuserId não fornecido!");
        if(!data.originUserId) throw new ValidationError("destinationUserId não fornecido!");
        if((!data.content || data.content.lenth === 0) && !data.file) throw new ValidationError("Conteúdo da mensagem não fornecido!");
        if(!data.type) throw new ValidationError("Tipo da mensagem não fornecido!");
    }
}