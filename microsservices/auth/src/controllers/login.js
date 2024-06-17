import ResponseMessage from "../models/Response.js";
import user from "../models/User.js";

export default class login{
    static async autenticate(req, res, next){
        try {
            if(user.countDocuments({email: req.body.email}) > 0){
                
            }else{
                res.status(404).json(new ResponseMessage(null, 'User not found!'))
            }
        } catch (error) {
            
        }
    }
}