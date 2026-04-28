import Menu from '../models/menuModel.js';

const menuController = {
  // GET /api/combos
  async getAll(req, res) {
    try {
      const items = await Menu.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los combos' });
    }
  },

  // POST /api/combos
  async create(req, res) {
    try {
      const newItem = await Menu.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el combo' });
    }
  },

  // PUT /api/combos/:id
  async update(req, res) {
    try {
      const updated = await Menu.update(req.params.id, req.body);
      if (updated) {
        res.json({ message: 'Combo actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Combo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el combo' });
    }
  },

  // DELETE /api/combos/:id
  async delete(req, res) {
    try {
      const deleted = await Menu.delete(req.params.id);
      if (deleted) {
        res.json({ message: 'Combo eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Combo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el combo' });
    }
  }
};

export default menuController;
