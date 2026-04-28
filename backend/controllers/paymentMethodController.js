import PaymentMethod from '../models/paymentMethodModel.js';

const paymentMethodController = {
  // Obtener todos los métodos de pago (opcionalmente por cliente)
  getAll: async (req, res) => {
    try {
      const { customerId } = req.query; // optional to filter by customer
      const methods = await PaymentMethod.getAll(customerId);
      res.json(methods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener métodos de pago' });
    }
  },

  // Obtener método de pago por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const method = await PaymentMethod.getById(id);
      if (method) {
        res.json(method);
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener método de pago' });
    }
  },

  // Crear un nuevo método de pago
  create: async (req, res) => {
    try {
      const { customerId, name, number } = req.body;
      if (!customerId || !name || !number) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const newMethod = await PaymentMethod.create({ customerId, name, number });
      res.status(201).json(newMethod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear método de pago' });
    }
  },

  // Actualizar un método de pago por ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { customerId, name, number } = req.body;

      if (!customerId || !name || !number) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      const updated = await PaymentMethod.update(id, { customerId, name, number });
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar método de pago' });
    }
  },

  // Eliminar un método de pago por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await PaymentMethod.delete(id);
      if (deleted) {
        res.json({ message: 'Método de pago eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Método de pago no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar método de pago' });
    }
  },
};

export default paymentMethodController;