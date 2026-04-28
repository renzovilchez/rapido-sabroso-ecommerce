import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/', adminController.getAll);
router.get('/email/:email', adminController.getByEmail);
router.get('/:id', adminController.getById);
router.post('/', adminController.create);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);
router.post('/login', adminController.login);

export default router;