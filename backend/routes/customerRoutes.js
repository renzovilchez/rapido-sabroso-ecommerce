import express from 'express';
import customerController from '../controllers/customerController.js';

const router = express.Router();

// 1. Obtener todos los clientes
router.get('/', customerController.getAll);

// 2. Obtener un cliente por correo
router.get('/email/:email', customerController.getByEmail);

// 3. Obtener un cliente por ID
router.get('/:id', customerController.getById);

// 4. Crear un nuevo cliente (registro)
router.post('/register', customerController.create);

// 5. Ruta de login
router.post('/login', customerController.login);

// 6. Actualizar los datos de un cliente
router.put('/:id', customerController.update);

// 7. Actualizar los puntos del cliente
router.put('/:id/puntos', customerController.updatePoints);

// 8. Eliminar un cliente
router.delete('/:id', customerController.delete);

export default router;
