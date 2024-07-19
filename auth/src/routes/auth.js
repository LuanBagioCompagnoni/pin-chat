import express from 'express';
import Auth from '../controllers/authController.js';

const routes = express.Router();

routes.post('/login', await Auth.login);
routes.post('/register', await Auth.register);

export default routes;
