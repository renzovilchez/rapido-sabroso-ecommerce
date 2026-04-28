import db from './db.js';

const OrderDetail = {
  // Obtener todos los detalles de un pedido
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido');
    return rows.map(row => ({
      orderDetailId: row.id_detalle_pedido,
      orderId: row.id_pedido,
      productId: row.id_producto,
      menuId: row.id_menu,
      quantity: row.cantidad,
      price: row.precio,
      subtotal: row.subtotal,
      tax: row.igv
    }));
  },

  // Obtener los detalles de un pedido por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM detalle_pedido WHERE id_detalle_pedido = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      orderDetailId: row.id_detalle_pedido,
      orderId: row.id_pedido,
      productId: row.id_producto,
      menuId: row.id_menu,
      quantity: row.cantidad,
      price: row.precio,
      subtotal: row.subtotal,
      tax: row.igv
    };
  },

  create: async (orderId, productId, quantity, price) => {
    const subtotal = quantity * price; // Calculamos el subtotal
    const tax = +((subtotal * 18) / 118).toFixed(2);

    const [result] = await db.execute(
      `INSERT INTO detalle_pedido 
        (id_pedido, id_producto, cantidad, precio, subtotal, igv) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [orderId, productId, quantity, price, subtotal, tax]
    );

    return {
      orderDetailId: result.insertId,
      orderId,
      productId,
      quantity,
      price,
      subtotal,
      tax
    };
  },

  // Actualizar un detalle de pedido
  update: async (id, orderId, productId, quantity, price) => {
    const subtotal = quantity * price;
    const tax = +((subtotal * 18) / 118).toFixed(2);
    const [result] = await db.execute(
      'UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio = ?, subtotal = ?, igv = ? WHERE id_detalle_pedido = ?',
      [orderId, productId, quantity, price, subtotal, tax, id]
    );
    return result.affectedRows > 0
      ? { orderDetailId: id, orderId, productId, quantity, price, subtotal, tax }
      : null;
  },

  // Eliminar un detalle de pedido
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default OrderDetail;