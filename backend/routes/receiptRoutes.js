import express from 'express';
import receiptController from '../controllers/receiptController.js';

const router = express.Router();

// Obtener todos los comprobantes
router.get('/', receiptController.getAll);

// Obtener un comprobante por pedido
router.get('/order/:id', receiptController.getByOrderId);

// Ruta para obtener comprobantes por cliente
router.get('/customer/:customerId', receiptController.getByCustomerId);

// Crear un nuevo comprobante
router.post('/', receiptController.create);

// Actualizar un comprobante por ID
router.put('/:id', receiptController.update);

// Eliminar un comprobante por ID
router.delete('/:id', receiptController.delete);

export default router;
