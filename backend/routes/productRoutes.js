import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

export default router;
