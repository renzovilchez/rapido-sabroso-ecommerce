import express from 'express';
import orderDetailController from '../controllers/orderDetailController.js';

const router = express.Router();

router.get('/', orderDetailController.getAll);
router.get('/:id', orderDetailController.getById);
router.post('/', orderDetailController.create);
router.put('/:id', orderDetailController.update);
router.delete('/:id', orderDetailController.delete);

export default router;
