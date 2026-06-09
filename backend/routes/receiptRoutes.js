import express from 'express';
import receiptController from '../controllers/receiptController.js';
import { verifyAdmin, verifyCustomer } from '../middlewares/auth.js';

const router = express.Router();

// Consulta de comprobantes (cliente autenticado)
router.get('/order/:id', verifyCustomer, receiptController.getByOrderId);
router.get('/customer/:customerId', verifyCustomer, receiptController.getByCustomerId);

// Administración de comprobantes (admin)
router.get('/', verifyAdmin, receiptController.getAll);
router.post('/', verifyAdmin, receiptController.create);
router.put('/:id', verifyAdmin, receiptController.update);
router.delete('/:id', verifyAdmin, receiptController.delete);

export default router;
