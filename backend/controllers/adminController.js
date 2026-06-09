import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/jwt.js';
import { SALT_ROUNDS } from '../config/constants.js';

const adminController = {
  getAll: async (req, res) => {
    try {
      const admins = await Admin.getAll();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener administradores' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.getById(id);
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener administrador' });
    }
  },

  getByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const adminFound = await Admin.getByEmail(email);
      if (adminFound) {
        const { password: _, ...safeData } = adminFound;
        res.json({
          adminId: safeData.adminId,
          name: safeData.name,
          email: safeData.email
        });
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar administrador por correo' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.getByEmail(email);
      if (!admin) return res.status(401).json({ success: false, message: 'Correo no encontrado' });

      const match = await bcrypt.compare(password, admin.password);
      if (!match) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

      const { password: _, ...safeData } = admin;
      const token = generateToken({
        id: safeData.adminId,
        email: safeData.email,
        role: 'admin'
      });
      res.status(200).json({ 
        success: true, 
        message: 'Login exitoso',
        token,
        admin: {
          adminId: safeData.adminId,
          name: safeData.name,
          email: safeData.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Hashear la contraseña antes de pasarla al modelo
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const newAdmin = await Admin.create(name, email, hashedPassword);
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear administrador' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      
      let finalPassword = password;
      if (password) {
        finalPassword = await bcrypt.hash(password, SALT_ROUNDS);
      }

      const updated = await Admin.update(id, name, email, finalPassword);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar administrador' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Admin.delete(id);
      if (deleted) {
        res.json({ message: 'Administrador eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Administrador no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar administrador' });
    }
  },
};

export default adminController;