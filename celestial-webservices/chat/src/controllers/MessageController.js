import MessageService from "../services/MessageService.js";

export default class MessageController {
    static async list(req, res, next){
        try{
            const result = await MessageService.list(req.params.id);
            res.status(result.status).json(result.data);
        }catch(error){
            next(error)
        }
    }
}
