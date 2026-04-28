import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', orderController.getAll);

// Obtener un pedido por ID
router.get('/:id', orderController.getById);

// Crear un nuevo pedido
router.post('/', orderController.create);

// Actualizar un pedido por ID
router.put('/:id', orderController.update);

// Eliminar un pedido por ID
router.delete('/:id', orderController.delete);

export default router;
