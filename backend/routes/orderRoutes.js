import express from 'express';
import orderController from '../controllers/orderController.js';
import { verifyAdmin, verifyCustomer } from '../middlewares/auth.js';

const router = express.Router();

// Gestión de pedidos (admin)
router.get('/', verifyAdmin, orderController.getAll);
router.get('/:id', verifyAdmin, orderController.getById);
router.delete('/:id', verifyAdmin, orderController.delete);

// Creación y actualización de pedidos (cliente autenticado)
router.post('/', verifyCustomer, orderController.create);
router.put('/:id', verifyCustomer, orderController.update);

export default router;
