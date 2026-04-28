import db from './db.js';
import bcrypt from 'bcrypt';

const Customer = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM cliente');
    return rows.map(row => ({
      customerId: row.id_cliente,
      firstName: row.nombre,
      lastName: row.apellidos,
      email: row.email,
      points: row.puntos,
      documentType: row.tipo_documento,
      dni: row.dni,
      ruc: row.ruc,
      businessName: row.razon_social,
      address: row.direccion,
      taxAddress: row.direccion_fiscal
    }));
  },

  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      customerId: row.id_cliente,
      firstName: row.nombre,
      lastName: row.apellidos,
      email: row.email,
      points: row.puntos,
      documentType: row.tipo_documento,
      dni: row.dni,
      ruc: row.ruc,
      businessName: row.razon_social,
      address: row.direccion,
      taxAddress: row.direccion_fiscal,
      password: row.password // internal use
    };
  },

  getByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM cliente WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      customerId: row.id_cliente,
      firstName: row.nombre,
      lastName: row.apellidos,
      email: row.email,
      points: row.puntos,
      documentType: row.tipo_documento,
      dni: row.dni,
      ruc: row.ruc,
      businessName: row.razon_social,
      address: row.direccion,
      taxAddress: row.direccion_fiscal,
      password: row.password
    };
  },

  login: async (email, password) => {
    const customer = await Customer.getByEmail(email);
    if (!customer) return null;

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return null;

    const { password: _, ...safeData } = customer;
    return safeData;
  },

  create: async ({
    firstName,
    lastName,
    email,
    password, // expected already hashed
    documentType = null,
    dni = null,
    ruc = null,
    businessName = null,
    address = null,
    taxAddress = null
  }) => {
    const [result] = await db.execute(`
      INSERT INTO cliente 
        (nombre, apellidos, email, password, tipo_documento, dni, ruc, razon_social, direccion, direccion_fiscal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, password, documentType, dni, ruc, businessName, address, taxAddress]
    );

    const newCustomer = await Customer.getById(result.insertId);
    const { password: _, ...safeData } = newCustomer;
    return safeData;
  },

  update: async (customerId, data) => {
    const {
      firstName,
      lastName,
      email,
      documentType,
      dni,
      ruc,
      businessName,
      address,
      taxAddress,
      password
    } = data;

    const fields = [
      'nombre = ?', 'apellidos = ?', 'email = ?', 'tipo_documento = ?',
      'dni = ?', 'ruc = ?', 'razon_social = ?', 'direccion = ?', 'direccion_fiscal = ?'
    ];
    const values = [firstName, lastName, email, documentType, dni, ruc, businessName, address, taxAddress];

    if (password) {
      fields.push('password = ?');
      values.push(password);
    }

    values.push(customerId);

    await db.execute(`
    UPDATE cliente SET ${fields.join(', ')} WHERE id_cliente = ?
  `, values);

    const updatedCustomer = await Customer.getById(customerId);
    const { password: _, ...safeData } = updatedCustomer;
    return safeData;
  },

  updatePoints: async (customerId, points) => {
    const [result] = await db.execute(
      'UPDATE cliente SET puntos = ? WHERE id_cliente = ?',
      [points, customerId]
    );
    return result.affectedRows > 0;
  },

  delete: async (customerId) => {
    const [result] = await db.execute('DELETE FROM cliente WHERE id_cliente = ?', [customerId]);
    return result.affectedRows > 0;
  },
};

export default Customer;