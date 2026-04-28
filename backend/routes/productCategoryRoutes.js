import express from 'express';
import productCategoryController from '../controllers/productCategoryController.js';

const router = express.Router();

// Rutas para obtener, crear y eliminar relaciones entre productos y categorías
router.get('/categories-by-type', productCategoryController.getCategoriesByType);
router.get('/', productCategoryController.getAll);
router.get('/:id', productCategoryController.getById);
router.post('/', productCategoryController.create);
router.delete('/:productId/:categoryId', productCategoryController.delete);

export default router;
