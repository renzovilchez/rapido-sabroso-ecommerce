import express from 'express';
import menuController from '../controllers/menuController.js';

const router = express.Router();

// Obtener todos los menús con sus productos
router.get('/', menuController.getAll);

// Crear un nuevo menú
router.post('/', menuController.create);

// Actualizar un menú existente
router.put('/:id', menuController.update);

// Eliminar un menú
router.delete('/:id', menuController.delete);

export default router;
