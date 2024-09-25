import express from 'express';
import MessageController from '../controllers/MessageController.js';

const router = express.Router();

router.get('/', MessageController.list);

export default router;
