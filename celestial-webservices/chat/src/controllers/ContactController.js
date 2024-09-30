import ContactService from "../services/ContactService.js";
import invalidRequestError from "ErrorHandler-Package/errors/InvalidRequestError.js";

export default class ContactController {
    static async getContact(req, res, next) {
        try{
            if(!req.query.param || !req.query.value){
                throw new invalidRequestError("Um ou mais dados não foram enviados ou estão incorretos!")
            }else{
                const filter = { [req.query.param]: req.query.value };
                const result = await ContactService.getContact(filter);
                res.status(result.status).json(result.data);
            }
        }catch (error){
            next(error);
        }
    }

    static async updateNameContact(req, res, next) {
        return
    }
}