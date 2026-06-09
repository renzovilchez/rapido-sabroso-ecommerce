import express from 'express';
import categoryController from '../controllers/categoryController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Lectura pública
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.get('/with-types/all', categoryController.getWithTypes);

// Administración (admin)
router.post('/', verifyAdmin, categoryController.create);
router.put('/:id', verifyAdmin, categoryController.update);
router.delete('/:id', verifyAdmin, categoryController.delete);

export default router;
