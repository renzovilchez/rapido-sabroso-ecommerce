import express from 'express';
import customerController from '../controllers/customerController.js';
import { verifyAdmin, verifyCustomer } from '../middlewares/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/register', customerController.create);
router.post('/login', customerController.login);
router.get('/email/:email', customerController.getByEmail);

// Administración de clientes (admin only)
router.get('/', verifyAdmin, customerController.getAll);
router.get('/:id', verifyAdmin, customerController.getById);

// Operaciones del propio cliente (customer only)
router.put('/:id', verifyCustomer, customerController.update);
router.put('/:id/puntos', verifyCustomer, customerController.updatePoints);
router.delete('/:id', verifyCustomer, customerController.delete);

export default router;
