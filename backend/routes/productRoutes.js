import express from 'express';
import productController from '../controllers/productController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Lectura pública
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Administración (admin)
router.post('/', verifyAdmin, productController.createProduct);
router.put('/:id', verifyAdmin, productController.updateProduct);
router.delete('/:id', verifyAdmin, productController.deleteProduct);

export default router;
