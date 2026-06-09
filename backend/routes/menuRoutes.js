import express from 'express';
import menuController from '../controllers/menuController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Lectura pública
router.get('/', menuController.getAll);

// Administración (admin)
router.post('/', verifyAdmin, menuController.create);
router.put('/:id', verifyAdmin, menuController.update);
router.delete('/:id', verifyAdmin, menuController.delete);

export default router;
