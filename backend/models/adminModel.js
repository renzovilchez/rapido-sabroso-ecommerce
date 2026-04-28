import db from './db.js';
import bcrypt from 'bcrypt';

const Admin = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM admin');
    return rows.map(row => ({
      adminId: row.idAdmin,
      name: row.nombre,
      email: row.correo
    }));
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM admin WHERE idAdmin = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      adminId: row.idAdmin,
      name: row.nombre,
      email: row.correo
    };
  },

  login: async (email, password) => {
    const admin = await Admin.getByEmail(email);
    if (!admin) return null;

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return null;

    const { password: _, ...safeData } = admin;
    return {
      adminId: safeData.idAdmin,
      name: safeData.nombre,
      email: safeData.correo
    };
  },

  getByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM admin WHERE correo = ?', [email]);
    return rows[0]; // Returns raw data for internal use (login)
  },

  create: async (name, email, password) => {
    const [result] = await db.execute(
      'INSERT INTO admin (nombre, correo, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { adminId: result.insertId, name, email };
  },

  update: async (id, name, email, password) => {
    const [result] = await db.execute(
      'UPDATE admin SET nombre = ?, correo = ?, password = ? WHERE idAdmin = ?',
      [name, email, password, id]
    );
    return result.affectedRows > 0 ? { adminId: id, name, email } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM admin WHERE idAdmin = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Admin;