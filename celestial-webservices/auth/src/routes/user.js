import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/user/:id', UserController.getById);
router.get('/user/list', UserController.list);
router.get('/user/email', UserController.getByEmail);
router.delete('/user/:id', UserController.delete);
router.put('/user/:id', UserController.update);

export default router;
