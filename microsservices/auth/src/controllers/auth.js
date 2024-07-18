import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
  static async login(req, res) {
    try {
      console.log('Post request!', req.body);
      const { email, password } = req.body;
      
      // Validação de entrada
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
      }

      const user = await User.findOne({ email: email });
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      if (!user) return res.status(404).json({ error: 'User not found!' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ user: email }, process.env.JWT_SECRET, { expiresIn: '120m' });
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
      const { email, password, ...otherDetails } = req.body;

      // Validação de entrada
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
      }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) return res.status(400).json({ error: 'User already exists!' });

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(`Hashed password: ${hashedPassword}`); // Log do hash da senha

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
