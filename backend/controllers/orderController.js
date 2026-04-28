import Order from '../models/orderModel.js';

const orderController = {
  // Obtener todos los pedidos
  getAll: async (req, res) => {
    try {
      const orders = await Order.getAll();
      res.json(orders);
    } catch (err) {
      console.error('Error en getAll:', err);
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  },

  // Obtener un pedido por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.getById(id);
      if (!order) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      res.json(order);
    } catch (err) {
      console.error('Error en getById:', err);
      res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  },

  // Crear un nuevo pedido
  create: async (req, res) => {
    try {
      const {
        customerId,
        paymentMethodId,
        deliveryAddress,
        shippingMethod,
        notes,
        discount = 0,
        pointsUsed = 0,
        products = [],
        combos = [],
        receiptType = 'boleta',
        dni = null,
        ruc = null,
        businessName = null,
        taxAddress = null
      } = req.body;

      // Validación: cliente y método de pago son obligatorios
      if (!customerId || !paymentMethodId) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      // Validación: debe haber al menos un producto o un combo
      if ((!Array.isArray(products) || products.length === 0) &&
        (!Array.isArray(combos) || combos.length === 0)) {
        return res.status(400).json({ error: 'Debe incluir al menos un producto o carta' });
      }

      // Crear el pedido (pasando todos los datos)
      const newOrder = await Order.create({
        customerId,
        paymentMethodId,
        deliveryAddress,
        shippingMethod,
        notes,
        discount,
        pointsUsed,
        products,
        combos,
        receiptType,
        dni,
        ruc,
        businessName,
        taxAddress
      });

      res.status(201).json(newOrder);
    } catch (err) {
      console.error('Error en create:', err);
      res.status(500).json({ error: 'Error al crear el pedido' });
    }
  },

  // Actualizar un pedido
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        customerId,
        paymentMethodId,
        deliveryAddress,
        shippingMethod,
        notes,
        discount = 0,
        pointsUsed = 0,
        products = [],
        combos = []
      } = req.body;

      if (!customerId || !paymentMethodId || (products.length === 0 && combos.length === 0)) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const updatedOrder = await Order.update(id, {
        customerId,
        paymentMethodId,
        deliveryAddress,
        shippingMethod,
        notes,
        discount,
        pointsUsed,
        products,
        combos
      });

      if (!updatedOrder) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.json(updatedOrder);
    } catch (err) {
      console.error('Error en update:', err);
      res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
  },

  // Eliminar un pedido
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Order.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }

      res.json({ message: 'Pedido eliminado correctamente' });
    } catch (err) {
      console.error('Error en delete:', err);
      res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
  },
};

export default orderController;