import express from 'express';
import UserController from '../controllers/UserController.js';
import {authenticateJWT} from "../middlewares/authenticateJWT.js";

const router = express.Router();

router.get('/:id', authenticateJWT, UserController.getById);
router.delete('/:id', authenticateJWT, UserController.delete);
router.put('/:id', authenticateJWT, UserController.update);
router.get('/', authenticateJWT, UserController.list);
router.put('/updateStatus/:id', authenticateJWT, UserController.updateStatus);

export default router;
