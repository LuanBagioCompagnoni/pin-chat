import UserService from "../services/UserService";

class UserController{
    static async update(req,res,next){
        const user = req.body();
        const result = UserService.update(req.params.id, user);
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }

    static async delete(req,res,next){
        const result = UserService.delete(req.params.id);
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }

    static async getById(req,res,next){
        const result = UserService.getById(req.params.id);
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }

    static async getByEmail(req,res,next){
        const result = UserService.getbyEmail(req.query.email);
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }

    static async list(req,res,next){
        const result = UserService.list();
        if(result.success){
            res.status(result.status).json(result.data)
        }else{
            const error = new Error(result.data)
            next(error)
        }
    }
}

export default UserController