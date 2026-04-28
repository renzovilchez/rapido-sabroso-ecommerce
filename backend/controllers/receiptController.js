import Receipt from '../models/receiptModel.js';

const receiptController = {
  // Obtener todos los comprobantes
  getAll: async (req, res) => {
    try {
      const receipts = await Receipt.getAll();
      res.json(receipts);
    } catch (error) {
      console.error('Error al obtener comprobantes:', error);
      res.status(500).json({ message: 'Error al obtener comprobantes' });
    }
  },

  // Obtener comprobante por ID de pedido
  getByOrderId: async (req, res) => {
    const { id } = req.params;

    try {
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const receipt = await Receipt.getByOrderId(id);

      if (!receipt) {
        return res.status(404).json({ message: 'Comprobante no encontrado' });
      }

      res.status(200).json(receipt);

    } catch (error) {
      console.error('Error al obtener comprobante por ID:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Obtener comprobantes por ID de cliente
  getByCustomerId: async (req, res) => {
    const { customerId } = req.params;

    try {
      if (isNaN(customerId)) {
        return res.status(400).json({ message: 'ID de cliente inválido' });
      }

      const receipts = await Receipt.getByCustomerId(customerId);

      res.status(200).json(receipts);

    } catch (error) {
      console.error('Error al obtener comprobantes por cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Crear un nuevo comprobante
  create: async (req, res) => {
    try {
      const data = req.body;
      const newReceipt = await Receipt.create(data);
      res.status(201).json(newReceipt);
    } catch (error) {
      console.error('Error al crear comprobante:', error);
      res.status(500).json({ message: 'Error al crear comprobante' });
    }
  },

  // Actualizar un comprobante por ID
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updated = await Receipt.update(id, data);
      if (!updated) {
        return res.status(404).json({ message: 'Comprobante no encontrado para actualizar' });
      }
      res.json({ message: 'Comprobante actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar comprobante:', error);
      res.status(500).json({ message: 'Error al actualizar comprobante' });
    }
  },

  // Eliminar un comprobante por ID
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Receipt.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Comprobante no encontrado para eliminar' });
      }
      res.json({ message: 'Comprobante eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar comprobante:', error);
      res.status(500).json({ message: 'Error al eliminar comprobante' });
    }
  }
};

export default receiptController;