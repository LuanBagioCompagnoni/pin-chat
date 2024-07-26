import UserService from "../services/UserService.js";

class UserController{
    static async update(req,res,next){
        const user = req.body();
        const result = await UserService.update(req.params.id, user);
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const result = await UserService.delete(req.params.id);
            res.status(result.status).json(result.data)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const result = await UserService.findById(req.params.id);
            res.status(result.status).json(result.data);
        } catch (error) {
            next(error);
        }
    }

    static async list(req,res,next){
        const result = await UserService.list();
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }
}

export default UserController