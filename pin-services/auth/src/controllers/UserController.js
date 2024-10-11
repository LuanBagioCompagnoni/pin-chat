import UserService from "../services/UserService.js";
import logger from "../helpers/logger.js";

class UserController{
    static async update(req,res,next){
        try {
            const user = req.body;
            logger.info(`Update user: ${req.params.id}`)
            const result = await UserService.update(req.params.id, user);
            res.status(200).json(result)
        } catch (error) {
            logger.error(`Update user error: ${error.message}`)
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            const result = await UserService.delete(req.params.id);
            logger.info(`Delete user: ${req.params.id}`)
            res.status(200).json(result)
        } catch (error) {
            logger.error(`Delete user error: ${error.message}`)
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const result = await UserService.findById(req.params.id);
            logger.info(`Get user by ID: ${req.params.id}`)
            res.status(200).json(result);
        } catch (error) {
            logger.error(`Get user by ID error: ${error.message}`)
            next(error);
        }
    }

    static async list(req,res,next){
        try {
            const result = await UserService.list();
            logger.info(`List user request`)
            res.status(200).json(result)
        } catch (error) {
            logger.error(`List user error: ${error.message}`)
            next(error)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const result = await UserService.updateStatus(req.params.id, req.body.online);
            logger.info(`Update user status: ${req.params.id}`);
            res.status(200).json(result);
        } catch (error) {
            logger.error(`Update user status error: ${error.message}`);
            next(error);
        }
    }


}

export default UserController