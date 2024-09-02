
import UserService from '../services/UserService.js';
import logger from '../helpers/logger.js'
import AuthService from '../services/AuthService.js';
import InvalidRequestError from "../middlewares/errors/InvalidRequestError.js";
import TokenError from "../middlewares/errors/TokenError.js";

class AuthController {
  static async login(req, res, next) {
    try {
        const { email, password } = req.body;
        logger.info(`Logging: ${email}`)
        const result = await AuthService.login(email, password);
        res.status(result.status).json(result.data);
    } catch (error) {
        logger.error(`Logging error: ${error.message}`)
        next(error);
    }
  }

  static async register(req, res, next) {
    try {
      logger.info(`Register: ${req.body.email}`)
      const result = await UserService.create(req.body)
        const user = result.data.document
        const token = result.data.token
      res.status(result.status).json({user, token});
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
          res.status(result.status).json({user: result.data});
      } catch (error){
          logger.error(`Verify token error: ${error.message}`)
          next(error)
      }
  }
}

export default AuthController;
