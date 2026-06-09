import express from 'express';
import orderDetailController from '../controllers/orderDetailController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(verifyAdmin);

router.get('/', orderDetailController.getAll);
router.get('/:id', orderDetailController.getById);
router.post('/', orderDetailController.create);
router.put('/:id', orderDetailController.update);
router.delete('/:id', orderDetailController.delete);

export default router;
