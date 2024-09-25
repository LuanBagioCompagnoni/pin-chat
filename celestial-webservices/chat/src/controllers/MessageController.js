import MessageService from "../services/MessageService.js";
import invalidRequestError from "ErrorHandler-Package/errors/InvalidRequestError.js";

export default class MessageController {
    static async list(req, res, next){
        try{
            if(req.body.serviceId){
                const result = await MessageService.list(req.body.serviceId);
                res.status(result.status).json(result.data);
            }else{
                throw new invalidRequestError('serviceId not provided');
            }
        }catch(error){
            next(error)
        }
    }
}
