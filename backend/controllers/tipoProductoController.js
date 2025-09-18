import TipoProducto from '../models/tipoProductoModel.js';

const tipoProductoController = {
  getAll: async (req, res) => {
    try {
      const tipos = await TipoProducto.getAll();
      res.json(tipos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener tipos de producto' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const tipo = await TipoProducto.getById(id);
      if (tipo) {
        res.json(tipo);
      } else {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el tipo de producto' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, imagen, id_categoria } = req.body;
      const nuevo = await TipoProducto.create({ nombre, imagen, id_categoria });
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el tipo de producto' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, imagen, id_categoria } = req.body;
      const actualizado = await TipoProducto.update(id, { nombre, imagen, id_categoria });
      if (actualizado) {
        res.json(actualizado);
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
      const eliminado = await TipoProducto.delete(id);
      if (eliminado) {
        res.json({ mensaje: 'Tipo de producto eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
    }
  },
};

export default tipoProductoController;