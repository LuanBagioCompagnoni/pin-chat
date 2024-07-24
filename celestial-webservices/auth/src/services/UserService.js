import InternalNotFoundError from "../middlewares/errors/InternalNotFoundError.js";
import ServiceResponse from "../models/ServiceReturn.js";
import User from "../models/User.js"

export default class UserService {
    static async create(user){
        try {
            const { email, password, ...otherDetails} = user;
            if(User.find({email})){
                return new ServiceResponse(400, "User already exists!")
            }
            if(user){
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ email, password: hashedPassword, ...otherDetails });
                const document = await newUser.save()
                return new ServiceResponse(201,document)
            }
        } catch (error) {
            return new ServiceResponse(500,error)
        }
    }

    static async delete(id){
        try {
            const isDeleted = await User.findByIdAndDelete(id);
            if(isDeleted){
                return new ServiceResponse(200)
            }else{
                return new ServiceResponse(304, `User not deleted: ${isDeleted}`)
            }
        } catch (error) {
            return new ServiceResponse(500,error)
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
            return new ServiceResponse(500,error)
        }
    }

    static async findById(id){
        try {
            const user = await User.findById(id)
            if(user){
                return new ServiceResponse(200,user)
            }else{
                throw new InternalNotFoundError()
            }
        } catch (error) {
            return new ServiceResponse(500,error)
        }
    }
    
    static async findByEmail(email){
        try {
            const user = await User.find({email: email})
            if(user){
                return new ServiceResponse(200,user)
            }else{
                throw new InternalNotFoundError()
            }
        } catch (error) {
            return new ServiceResponse(500,error)
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
            return new ServiceResponse(500,error)
        }
    }
}