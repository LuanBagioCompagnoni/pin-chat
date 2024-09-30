import MessageService from "../services/MessageService.js";
import invalidRequestError from "ErrorHandler-Package/errors/InvalidRequestError.js";

const messageService = new MessageService();

export default class MessageController {
    static async list(req, res, next){
        try{
            if(req.query.contactId){
                const result = await messageService.listForContact(req.query.contactId);
                res.status(200).json(result);
            }else{
                throw new invalidRequestError('contactId não foi fornecido');
            }
        }catch(error){
            next(error)
        }
    }

    static async sendMessage(req, res, next){
        try{
            if(req.body){
                const result = await messageService.create(req.body);
                res.status(200).json(result);
            }else{
                throw new invalidRequestError('Conteúdo da mensagem não foi fornecido!');
            }
        }catch(error){
            next(error)
        }
    }

    static async editMessage(req, res, next){
        try{
            if(req.body){
                await messageService.updateMessage(req.query.id, req.body.content);
            }
        }catch (error){
            next(error);
        }
    }
}
