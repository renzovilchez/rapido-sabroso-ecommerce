import Customer from '../models/customerModel.js';
import bcrypt from 'bcrypt';

const customerController = {
  getAll: async (req, res) => {
    try {
      const customers = await Customer.getAll();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.getById(id);
      customer ? res.json(customer) : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al obtener cliente' });
    }
  },

  getByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const customer = await Customer.getByEmail(email);
      customer ? res.json(customer) : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al buscar cliente por correo' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const customer = await Customer.getByEmail(email);
      if (!customer) return res.status(401).json({ success: false, message: 'Correo no encontrado' });

      const match = await bcrypt.compare(password, customer.password);
      if (!match) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

      delete customer.password;
      res.status(200).json({ success: true, message: 'Login exitoso', customer });
    } catch (err) {
      res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
  },

  create: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        documentType,
        dni,
        ruc,
        businessName,
        address,
        taxAddress
      } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newCustomer = await Customer.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        documentType,
        dni,
        ruc,
        businessName,
        address,
        taxAddress
      });
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar cliente', detalle: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };

      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }

      const updated = await Customer.update(id, data);
      updated
        ? res.json(updated)
        : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  },

  updatePoints: async (req, res) => {
    try {
      const { id } = req.params;
      const { points } = req.body;
      const updated = await Customer.updatePoints(id, points);
      updated
        ? res.json({ mensaje: 'Puntos actualizados correctamente' })
        : res.status(404).json({ error: 'Cliente no encontrado o sin cambios' });
    } catch {
      res.status(500).json({ error: 'Error al actualizar puntos del cliente' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Customer.delete(id);
      deleted
        ? res.json({ mensaje: 'Cliente eliminado correctamente' })
        : res.status(404).json({ error: 'Cliente no encontrado' });
    } catch {
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  }
};

export default customerController;