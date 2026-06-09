import express from 'express';
import productCategoryController from '../controllers/productCategoryController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Lectura pública
router.get('/categories-by-type', productCategoryController.getCategoriesByType);
router.get('/', productCategoryController.getAll);
router.get('/:id', productCategoryController.getById);

// Administración (admin)
router.post('/', verifyAdmin, productCategoryController.create);
router.delete('/:productId/:categoryId', verifyAdmin, productCategoryController.delete);

export default router;
