import UserService from "../services/UserService.js";

class UserController{
    static async update(req,res,next){
        try {
            const user = req.body;
            const result = await UserService.update(req.params.id, user);
            res.status(result.status).json(result.data)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const result = await UserService.delete(req.params.id);
            res.status(result.status).json(result.data)
        } catch (error) {
            console.log(error)
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
        try {
            const result = await UserService.list();
            res.status(result.status).json(result.data)
        } catch (error) {
            next(error)
        }
    }
}

export default UserController