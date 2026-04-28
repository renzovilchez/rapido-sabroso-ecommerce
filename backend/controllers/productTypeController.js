import ProductType from '../models/productTypeModel.js';

const productTypeController = {
  getAll: async (req, res) => {
    try {
      const types = await ProductType.getAll();
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener tipos de producto' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const type = await ProductType.getById(id);
      if (type) {
        res.json(type);
      } else {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el tipo de producto' });
    }
  },

  create: async (req, res) => {
    try {
      const { name, image, categoryId } = req.body;
      const newType = await ProductType.create({ name, image, categoryId });
      res.status(201).json(newType);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el tipo de producto' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image, categoryId } = req.body;
      const updated = await ProductType.update(id, { name, image, categoryId });
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el tipo de producto' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await ProductType.delete(id);
      if (deleted) {
        res.json({ message: 'Tipo de producto eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
    }
  },
};

export default productTypeController;