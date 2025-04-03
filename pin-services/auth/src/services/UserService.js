import {generateJWT, hashPassword} from "../helpers/authHelper.js";
import {DuplicityError, InternalNotFoundError, NoChangeError} from "ErrorHandler-Package";
import User from "../models/User.js"

export default class UserService {
    static async create(user){
        const exist = await User.findOne({email: user.email})
        if(exist){
            throw new DuplicityError('Esse usuário já tem um cadastro!')
        }
        if(user){
            user.password = await hashPassword(user.password, 10);
            const newUser = new User(user);
            const document = await newUser.save()
            const token = await generateJWT(document._id, user.email)
            return {token, document}
        }
    }

    static async delete(id){
        const isDeleted = await User.findByIdAndDelete(id);
        if(isDeleted){
            return isDeleted
        }else{
            throw new NoChangeError('Usuário não foi deletado!')
        }
    }

    static async update(id, user){
        const isUpdated = await User.findByIdAndUpdate(id, user);
        if(isUpdated){
            return isUpdated
        }else{
            throw new NoChangeError('Usuário não foi alterado!')
        }
    }

    static async findById(id){
        const user = await User.findById(id);
        if(user){
            return user
        } else {
            throw new InternalNotFoundError('Usuário não encontrado!');
        }
    }
    
    static async findByEmail(email){
        const user = await User.findOne({email: email})
        if(user){
            return user
        }else{
            throw new InternalNotFoundError('Usuário não encontrado!')
        }
    }

    static async list(){
        const users = await User.find()
        if(users){
            return users
        }else{
            throw new InternalNotFoundError('Não há usuários para listar!')
        }
    }

    static async updateStatus(idUser, online){
        const isUpdated = await User.findByIdAndUpdate(idUser, {online: online}, {new: true});
        if(isUpdated){
            return isUpdated
        }else{
            throw new NoChangeError('Usuário não foi alterado!')
        }
    }
}