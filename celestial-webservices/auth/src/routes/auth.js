import express from 'express';
import Auth from '../controllers/AuthController.js';

const routes = express.Router();

routes.post('/login', await Auth.login);
routes.post('/register', await Auth.register);

export default routes;
