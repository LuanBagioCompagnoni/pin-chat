import MessageService from "../services/MessageService.js";
import invalidRequestError from "ErrorHandler-Package/errors/InvalidRequestError.js";

export default class MessageController {
    static async list(req, res, next){
        try{
            if(req.body.contactId){
                const result = await MessageService.list(req.body.contactId);
                res.status(result.status).json(result.data);
            }else{
                throw new invalidRequestError('contactId not provided');
            }
        }catch(error){
            next(error)
        }
    }

    static async sendMessage(req, res, next){
        try{
            if(req.body){
                const result = await MessageService.create(req.body);
                res.status(result.status).json(result);
            }else{
                throw new invalidRequestError('Message content not provided');
            }
        }catch(error){
            next(error)
        }
    }
}
