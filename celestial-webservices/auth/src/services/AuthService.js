import { comparePasswords, generateJWT } from "../helpers/authHelper.js";
import ServiceResponse from "../models/ServiceReturn.js";
import UserService from "./UserService.js";

export default class AuthService{
    static async login(email, password){
        try {
            const user = await UserService.findByEmail(email);
            if(!user){
                return new ServiceResponse(401, "User not found!")
            }
            const isMatch = await comparePasswords(password, user.data.password);

            if (!isMatch) {
                return new ServiceResponse(401, "Invalid credentials");
            }

            const token = await generateJWT(user.data._id, email)
            return new ServiceResponse(200, token);
        } catch (error) {
            return new ServiceResponse(200,error.message);
        }
    }
}