import { hashPassword } from "../helpers/authHelper.js";
import DuplicityError from "../middlewares/errors/DuplicityError.js";
import GenericError from "../middlewares/errors/GenericError.js";
import InternalNotFoundError from "../middlewares/errors/InternalNotFoundError.js";
import ServiceResponse from "../models/ServiceReturn.js";
import User from "../models/User.js"

export default class UserService {
    static async create(user){
        const exist = await User.findOne({email: user.email})
        if(exist){
            throw new DuplicityError("User")
        }
        if(user){
            const hashedPassword = await hashPassword(user.password, 10);
            user.password = hashedPassword;
            console.log(user)
            const newUser = new User(user);
            const document = await newUser.save()
            return new ServiceResponse(201, document)
        }
    }

    static async delete(id){
        const isDeleted = await User.findByIdAndDelete(id);
        if(isDeleted){
            return new ServiceResponse(200)
        }else{
            throw new GenericError(`User not deleted: ${isDeleted}`, 304)
        }
    }

    static async update(id, user){
        try {
            const isUpdated = await User.findByIdAndUpdate(id, user);
            if(isUpdated){
                return new ServiceResponse(200, isUpdated)
            }else{
                return new ServiceResponse(304, `User not updated: ${isDeleted}`)
            }
        } catch (error) {
            return new ServiceResponse(500,error.message)
        }
    }

    static async findById(id){
        try {
            const user = await User.findById(id);
            if(user){
                return new ServiceResponse(200, user);
            } else {
                throw new InternalNotFoundError('User');
            }
        } catch (error) {
            throw error;
        }
    }
    
    static async findByEmail(email){
        try {
            const user = await User.findOne({email: email})
            if(user){
                return new ServiceResponse(200,user)
            }else{
                throw new InternalNotFoundError(User)
            }
        } catch (error) {
            throw error
        }
    }

    static async list(){
        try {
            const users = await User.find()
            if(users){
                return new ServiceResponse(200,users)
            }else{
                throw new InternalNotFoundError()
            }
        } catch (error) {
            throw error
        }
    }
}