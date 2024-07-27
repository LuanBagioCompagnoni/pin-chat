import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id', UserController.getById);
router.delete('/:id', UserController.delete);
router.put('/:id', UserController.update);
router.get('/', UserController.list);

export default router;
