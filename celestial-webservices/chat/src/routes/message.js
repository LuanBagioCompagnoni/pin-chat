import express from 'express';
import MessageController from '../controllers/MessageController.js';

const router = express.Router();

router.get('/', MessageController.list);
router.post('/', MessageController.sendMessage);
router.put('/:id', MessageController.editMessage);

export default router;
