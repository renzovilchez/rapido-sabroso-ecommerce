import express from 'express';
import paymentMethodController from '../controllers/paymentMethodController.js';

const router = express.Router();

// Obtener todos los métodos de pago (opcional filtro por cliente via query param)
router.get('/', paymentMethodController.getAll);

// Obtener método de pago por ID
router.get('/:id', paymentMethodController.getById);

// Crear un nuevo método de pago
router.post('/', paymentMethodController.create);

// Actualizar un método de pago por ID
router.put('/:id', paymentMethodController.update);

// Eliminar un método de pago por ID
router.delete('/:id', paymentMethodController.delete);

export default router;
