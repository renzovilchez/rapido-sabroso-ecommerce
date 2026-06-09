import Category from '../models/categoryModel.js';

const categoryController = {
  // Obtener todas las categorías
  getAll: async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  },

  // Obtener categoría por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.getById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categoría' });
    }
  },

  // Crear nueva categoría
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = await Category.create(name);
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear categoría' });
    }
  },

  // Actualizar categoría
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updated = await Category.update(id, name);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar categoría' });
    }
  },

  // Eliminar categoría
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Category.delete(id);
      if (deleted) {
        res.json({ message: 'Categoría eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar categoría' });
    }
  },

  // Obtener categorías con tipos
  getWithTypes: async (req, res) => {
    try {
      const result = await Category.getCategoriesWithTypes();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener categorías con tipos' });
    }
  }
};

export default categoryController;