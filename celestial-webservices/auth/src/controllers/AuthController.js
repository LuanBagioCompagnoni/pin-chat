
import UserService from '../services/UserService.js';
import logger from '../helpers/logger.js'
import AuthService from '../services/AuthService.js';

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
      res.status(result.status).json(result.data)
    } catch (error) {
        logger.error(`Register error: ${error.message}`)
        next(error)
    }
  }
}

export default AuthController;
