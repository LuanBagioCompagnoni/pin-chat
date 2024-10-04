
import UserService from '../services/UserService.js';
import logger from '../helpers/logger.js'
import AuthService from '../services/AuthService.js';
import {InternalNotFoundError, TokenError} from "ErrorHandler-Package";

class AuthController {
  static async login(req, res, next) {
    try {
        const { email, password } = req.body;
        logger.info(`Logging: ${email}`)
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Logging error: ${error.message}`)
        let err = error;
        if(error instanceof InternalNotFoundError){
            err = new InternalNotFoundError('Usuário não encontrado, registre-se!');
        }
        next(err);
    }
  }

  static async register(req, res, next) {
    try {
      logger.info(`Register: ${req.body.email}`)
      const result = await UserService.create(req.body)
        const user = result.document
        const token = result.token
      res.status(200).json({user, token});
    } catch (error) {
        logger.error(`Register error: ${error.message}`)
        next(error)
    }
  }

  static async verifyToken(req, res, next) {
      try{
          const token = req.headers['authorization']?.split(' ')[1];
          logger.info(`Validating token: ${token}`)
          if(!token){
              throw new TokenError('Token não fornecido!')
          }
          const result = await AuthService.verifyToken(token);
          res.status(200).json({user: result});
      } catch (error){
          logger.error(`Verify token error: ${error.message}`)
          next(error)
      }
  }
}

export default AuthController;
