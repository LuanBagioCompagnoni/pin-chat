import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id', UserController.getById);
router.get('/list', UserController.list);
router.get('/email', UserController.getByEmail);
router.delete('/:id', UserController.delete);
router.put('/:id', UserController.update);

export default router;
