import { comparePasswords, generateJWT, verifyToken } from "../helpers/authHelper.js";
import UserService from "./UserService.js";
import { LoginError, TokenError } from "ErrorHandler-Package";

export default class AuthService {
    static async login(email, password) {
        const user = await UserService.findByEmail(email);
        if (!user) {
            throw new LoginError("Usuário não encontrado!");
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            throw new LoginError("Senha incorreta!");
        }

        const token = await generateJWT(user);
        return { token, user };
    }

    static async verifyToken(token) {
        const tokenUser = await verifyToken(token);
        if (tokenUser) {
            return tokenUser.user;
        } else {
            throw new TokenError("Sessão expirada!");
        }
    }

    static async generateToken(user) {
        return generateJWT(user);
    }
}
