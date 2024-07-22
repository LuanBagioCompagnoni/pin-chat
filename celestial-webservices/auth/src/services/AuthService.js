import { generateJWT } from "../helpers/authHelper.js";
import ServiceResponse from "../models/ServiceReturn.js";
import UserService from "./UserService.js";
import bcrypt from 'bcrypt';

export default class AuthService{
    static async login(email, password){
        try {
            const result = await UserService.findByEmail(email);
            if(!result.success){
                return new ServiceResponse(401, "User not found!")
            }

            const isMatch = await bcrypt.compare(password, result.data.password)

            if (!isMatch) {
                return new ServiceResponse(401, "Invalid credentials");
            }

            const token = generateJWT(result.data._id, email)
            return new ServiceResponse(200, { token });
        } catch (error) {
            return new ServiceResponse(200,error);
        }
    }
}