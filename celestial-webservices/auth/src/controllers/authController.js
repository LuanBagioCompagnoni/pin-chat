import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';
import userService from '../services/userService.js';
import { generateJWT } from '../helpers/authHelper.js';
import { log } from '../helpers/logHelper.js';

dotenv.config();

class Auth {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      log(`Login request. User: ${email}`)
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
      }

      const user = await User.findOne({ email: email });
      if (!user) return res.status(404).json({ error: 'User not found!' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateJWT(email)
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: 'Incorrect password!' });
      }
    } catch (error) {
      console.error('Error during login', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async register(req, res) {
    try {
      const result = userService.create(req.body)
      
      if(result.sucess){
        res.status(201).json(result.data)
      }else{
        return res.status(400).json({ error: 'Email and password are required!' });
      }

      const { email, password, ...otherDetails } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
      }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) return res.status(400).json({ error: 'User already exists!' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ email, password: hashedPassword, ...otherDetails });
      const document = await newUser.save();
      res.status(200).json(document);
    } catch (error) {
      console.error('Error during registration', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default Auth;
