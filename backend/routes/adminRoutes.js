import express from 'express';
import adminController from '../controllers/adminController.js';
import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', adminController.login);

router.use(verifyAdmin);

router.get('/', adminController.getAll);
router.get('/email/:email', adminController.getByEmail);
router.get('/:id', adminController.getById);
router.post('/', adminController.create);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

export default router;