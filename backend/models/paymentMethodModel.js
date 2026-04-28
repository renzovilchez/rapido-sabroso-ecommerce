import db from './db.js';

const PaymentMethod = {
  // Obtener todos los métodos de pago (opcionalmente filtrar por cliente)
  getAll: async (customerId = null) => {
    let query = `SELECT id_metodo_pago, id_cliente, nombre, numero FROM metodo_pago`;
    let params = [];

    if (customerId) {
      query += ` WHERE id_cliente = ?`;
      params.push(customerId);
    }

    const [rows] = await db.execute(query, params);
    return rows.map(row => ({
      paymentMethodId: row.id_metodo_pago,
      customerId: row.id_cliente,
      name: row.nombre,
      number: row.numero
    }));
  },

  // Obtener método de pago por ID
  getById: async (id) => {
    const [rows] = await db.execute(
      `SELECT id_metodo_pago, id_cliente, nombre, numero FROM metodo_pago WHERE id_metodo_pago = ?`,
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      paymentMethodId: row.id_metodo_pago,
      customerId: row.id_cliente,
      name: row.nombre,
      number: row.numero
    };
  },

  // Crear un nuevo método de pago
  create: async ({ customerId, name, number }) => {
    const [result] = await db.execute(
      `INSERT INTO metodo_pago (id_cliente, nombre, numero) VALUES (?, ?, ?)`,
      [customerId, name, number]
    );
    return { 
      paymentMethodId: result.insertId, 
      customerId, 
      name, 
      number 
    };
  },

  // Actualizar un método de pago por ID
  update: async (id, { customerId, name, number }) => {
    const [result] = await db.execute(
      `UPDATE metodo_pago SET id_cliente = ?, nombre = ?, numero = ? WHERE id_metodo_pago = ?`,
      [customerId, name, number, id]
    );
    if (result.affectedRows === 0) return null;
    return { 
      paymentMethodId: id, 
      customerId, 
      name, 
      number 
    };
  },

  // Eliminar un método de pago por ID
  delete: async (id) => {
    const [result] = await db.execute(
      `DELETE FROM metodo_pago WHERE id_metodo_pago = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
};

export default PaymentMethod;