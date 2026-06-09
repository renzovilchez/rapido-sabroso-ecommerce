import express from 'express';
import productTypeController from '../controllers/productTypeController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Lectura pública
router.get('/', productTypeController.getAll);
router.get('/:id', productTypeController.getById);

// Administración (admin)
router.post('/', verifyAdmin, productTypeController.create);
router.put('/:id', verifyAdmin, productTypeController.update);
router.delete('/:id', verifyAdmin, productTypeController.delete);

export default router;
