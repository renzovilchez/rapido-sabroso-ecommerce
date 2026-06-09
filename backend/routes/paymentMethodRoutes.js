import express from 'express';
import paymentMethodController from '../controllers/paymentMethodController.js';
import { verifyCustomer } from '../middlewares/auth.js';

const router = express.Router();

router.use(verifyCustomer);

router.get('/', paymentMethodController.getAll);
router.get('/:id', paymentMethodController.getById);
router.post('/', paymentMethodController.create);
router.put('/:id', paymentMethodController.update);
router.delete('/:id', paymentMethodController.delete);

export default router;
