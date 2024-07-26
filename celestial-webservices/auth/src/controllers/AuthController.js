
import UserService from '../services/UserService.js';
import { log } from '../helpers/logHelper.js';
import AuthService from '../services/AuthService.js';

class AuthController {
  static async login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        if (result.success) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ error: result.message });
        }
    } catch (error) {
        next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const result = await UserService.create(req.body)
      if(result.success){
        res.status(result.status).json(result.data)
      }else{
        res.status(result.status).json(result.data);
      }
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController;
