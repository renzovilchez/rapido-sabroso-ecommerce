import express from 'express';
import productTypeController from '../controllers/productTypeController.js';

const router = express.Router();

router.get('/', productTypeController.getAll);
router.get('/:id', productTypeController.getById);
router.post('/', productTypeController.create);
router.put('/:id', productTypeController.update);
router.delete('/:id', productTypeController.delete);

export default router;
