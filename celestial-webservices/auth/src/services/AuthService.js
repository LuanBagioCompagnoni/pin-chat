import { comparePasswords, generateJWT, verifyToken } from "../helpers/authHelper.js";
import UserService from "./UserService.js";
import {LoginError, TokenError} from "ErrorHandler-Package";

export default class AuthService{
    static async login(email, password){
        const user = await UserService.findByEmail(email);
        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            throw new LoginError("Usuário ou senha incorretos!");
        }

        const token = await generateJWT(user._id, email)
        return {token, user: user}
    }

    static async verifyToken(token){
        const decode = await verifyToken(token)
        if(decode) return await UserService.findByEmail(decode.user);
        else throw new TokenError("Token inválido ou expirado!")
    }
}