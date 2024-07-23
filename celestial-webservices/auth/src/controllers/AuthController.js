import bcrypt from 'bcrypt';
import User from '../models/User.js';
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

  static async register(req, res) {
    try {
      const result = UserService.create(req.body)
      
      if(result.sucess){
        res.status(201).json(result.data)
      }else{
        res.status(400).json({ error: 'Email and password are required!' });
      }
    } catch (error) {
      console.error('Error during registration', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default AuthController;
