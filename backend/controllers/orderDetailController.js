import OrderDetail from '../models/orderDetailModel.js';

const orderDetailController = {
  // Obtener todos los detalles de pedidos
  getAll: async (req, res) => {
    try {
      const details = await OrderDetail.getAll();
      res.json(details);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener detalles de pedidos' });
    }
  },

  // Obtener un detalle de pedido por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const detail = await OrderDetail.getById(id);
      if (detail) {
        res.json(detail);
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al obtener detalle de pedido' });
    }
  },

  // Crear un nuevo detalle de pedido
  create: async (req, res) => {
    try {
      const { orderId, productId, quantity, price } = req.body;
      const subtotal = quantity * price; // Calculamos el subtotal
      const newDetail = await OrderDetail.create(orderId, productId, quantity, price, subtotal);
      res.status(201).json(newDetail);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear detalle de pedido' });
    }
  },

  // Actualizar un detalle de pedido
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { orderId, productId, quantity, price } = req.body;
      const subtotal = quantity * price; // Calculamos el subtotal
      const updated = await OrderDetail.update(id, orderId, productId, quantity, price, subtotal);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al actualizar detalle de pedido' });
    }
  },

  // Eliminar un detalle de pedido
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await OrderDetail.delete(id);
      if (deleted) {
        res.json({ message: 'Detalle de pedido eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Detalle de pedido no encontrado' });
      }
    } catch {
      res.status(500).json({ error: 'Error al eliminar detalle de pedido' });
    }
  },
};

export default orderDetailController;