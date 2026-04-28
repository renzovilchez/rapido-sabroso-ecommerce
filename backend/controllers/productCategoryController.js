import ProductCategory from '../models/productCategoryModel.js';

const productCategoryController = {
  // Obtener todas las relaciones entre productos y categorías
  getAll: async (req, res) => {
    try {
      const relations = await ProductCategory.getAll();
      res.json(relations);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener relaciones producto-categoría' });
    }
  },

  // Obtener una relación entre producto y categoría por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const relation = await ProductCategory.getById(id);
      if (relation) {
        res.json(relation);
      } else {
        res.status(404).json({ error: 'Relación producto-categoría no encontrada' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener relación producto-categoría' });
    }
  },

  // Obtener categorías agrupadas por tipo
  getCategoriesByType: async (req, res) => {
    try {
      const categoriesByType = await ProductCategory.getCategoriesByType();
      res.json(categoriesByType);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener categorías por tipo' });
    }
  },  

  // Crear una nueva relación entre producto y categoría
  create: async (req, res) => {
    try {
      const { productId, categoryId } = req.body;
      const newRelation = await ProductCategory.create(productId, categoryId);
      res.status(201).json(newRelation);
    } catch {
      res.status(500).json({ error: 'Error al crear relación producto-categoría' });
    }
  },

  // Eliminar una relación entre producto y categoría
  delete: async (req, res) => {
    try {
      const { productId, categoryId } = req.params;
      const deleted = await ProductCategory.delete(productId, categoryId);
      if (deleted) {
        res.json({ message: 'Relación producto-categoría eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Relación producto-categoría no encontrada' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar relación producto-categoría' });
    }
  },
};

export default productCategoryController;