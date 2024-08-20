import { comparePasswords, generateJWT } from "../helpers/authHelper.js";
import ServiceResponse from "../models/ServiceReturn.js";
import UserService from "./UserService.js";
import InternalNotFoundError from "../middlewares/errors/InternalNotFoundError.js";
import DuplicityError from "../middlewares/errors/DuplicityError.js";

export default class AuthService{
    static async login(email, password){
        const user = await UserService.findByEmail(email);
        const isMatch = await comparePasswords(password, user.data.password);

        if (!isMatch) {
            return new ServiceResponse(401, "Usuario ou senha incorretos!");
        }

        const token = await generateJWT(user.data._id, email)
        return new ServiceResponse(200, token);
    }
}