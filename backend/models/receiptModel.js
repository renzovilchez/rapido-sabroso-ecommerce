import db from './db.js';

const Receipt = {
  // Obtener todos los comprobantes con datos del pedido
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        c.id_comprobante,
        c.id_pedido,
        c.tipo,
        c.serie,
        c.correlativo,
        c.dni,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.direccion_fiscal,
        c.fecha,
        p.total AS total_pedido
      FROM comprobante c
      LEFT JOIN pedido p ON c.id_pedido = p.id_pedido
      ORDER BY c.fecha DESC
    `);
    
    return rows.map(row => ({
      receiptId: row.id_comprobante,
      orderId: row.id_pedido,
      type: row.tipo,
      series: row.serie,
      correlative: row.correlativo,
      dni: row.dni,
      ruc: row.ruc,
      businessName: row.razon_social,
      address: row.direccion,
      taxAddress: row.direccion_fiscal,
      date: row.fecha,
      orderTotal: row.total_pedido
    }));
  },

  // Obtener comprobante por ID de pedido
  getByOrderId: async (orderId) => {
    // Obtener comprobante con datos de cliente y pedido
    const [rows] = await db.execute(`
    SELECT 
      c.id_comprobante,
      c.tipo,
      c.serie,
      c.correlativo,
      c.fecha,
      p.subtotal,
      p.igv,
      p.descuento,
      p.total,
      cl.nombre,
      cl.apellidos,
      cl.tipo_documento,
      cl.dni,
      cl.ruc,
      cl.razon_social,
      cl.direccion_fiscal,
      cl.direccion AS customer_address
    FROM comprobante c
    JOIN pedido p ON p.id_pedido = c.id_pedido
    JOIN cliente cl ON cl.id_cliente = p.id_cliente
    WHERE c.id_pedido = ?
  `, [orderId]);

    if (rows.length === 0) return null;

    const receipt = rows[0];

    // Obtener productos individuales
    const [products] = await db.execute(`
    SELECT 
      dp.id_detalle_pedido,
      dp.id_producto,
      pr.nombre,
      dp.cantidad,
      dp.precio,
      dp.subtotal,
      dp.igv
    FROM detalle_pedido dp
    LEFT JOIN producto pr ON pr.id_producto = dp.id_producto
    WHERE dp.id_pedido = ? AND dp.id_producto IS NOT NULL
  `, [orderId]);

    // Obtener combos
    const [combos] = await db.execute(`
    SELECT 
      dp.id_detalle_pedido,
      dp.id_menu,
      m.nombre,
      dp.cantidad,
      dp.precio,
      dp.subtotal,
      dp.igv
    FROM detalle_pedido dp
    LEFT JOIN menu m ON m.id_menu = dp.id_menu
    WHERE dp.id_pedido = ? AND dp.id_menu IS NOT NULL
  `, [orderId]);

    // Unificar en un solo array
    const items = [
      ...products.map(p => ({
        type: 'product',
        id: p.id_producto,
        name: p.nombre,
        quantity: p.cantidad,
        unitPrice: p.precio,
        subtotal: p.subtotal,
        tax: p.igv
      })),
      ...combos.map(c => ({
        type: 'menu',
        id: c.id_menu,
        name: c.nombre,
        quantity: c.cantidad,
        unitPrice: c.precio,
        subtotal: c.subtotal,
        tax: c.igv
      }))
    ];

    // Armar objeto de respuesta completo
    return {
      receiptId: receipt.id_comprobante,
      receiptType: receipt.tipo,
      receiptNumber: `${receipt.serie}-${receipt.correlativo.toString().padStart(8, '0')}`,
      issueDate: receipt.fecha,
      customer: {
        name: `${receipt.nombre} ${receipt.apellidos}`,
        documentType: receipt.tipo_documento,
        dni: receipt.dni,
        ruc: receipt.ruc,
        businessName: receipt.razon_social,
        taxAddress: receipt.direccion_fiscal || receipt.customer_address
      },
      items,
      totals: {
        subtotal: parseFloat(receipt.subtotal),
        tax: parseFloat(receipt.igv),
        discount: parseFloat(receipt.descuento),
        total: parseFloat(receipt.total)
      }
    };
  },

  // Obtener comprobantes por ID de cliente
  getByCustomerId: async (customerId) => {
    const [rows] = await db.execute(`
      SELECT 
        c.id_comprobante,
        c.id_pedido,
        c.tipo,
        c.serie,
        c.correlativo,
        c.dni,
        c.ruc,
        c.razon_social,
        c.direccion,
        c.direccion_fiscal,
        c.fecha,
        p.total AS total_pedido
      FROM comprobante c
      JOIN pedido p ON c.id_pedido = p.id_pedido
      JOIN cliente cl ON cl.id_cliente = p.id_cliente
      WHERE cl.id_cliente = ?
      ORDER BY c.fecha DESC
    `, [customerId]);

    return rows.map(row => ({
      receiptId: row.id_comprobante,
      orderId: row.id_pedido,
      type: row.tipo,
      series: row.serie,
      correlative: row.correlativo,
      dni: row.dni,
      ruc: row.ruc,
      businessName: row.razon_social,
      address: row.direccion,
      taxAddress: row.direccion_fiscal,
      date: row.fecha,
      orderTotal: row.total_pedido
    }));
  },

  // Crear un comprobante nuevo con correlativo automático
  create: async (data) => {
    const {
      orderId,
      type,
      series,
      dni = null,
      ruc = null,
      businessName = null,
      address = null,
      taxAddress = null,
    } = data;

    // Obtener último correlativo para el tipo y serie dado
    const [rows] = await db.execute(`
      SELECT correlativo FROM comprobante
      WHERE tipo = ? AND serie = ?
      ORDER BY correlativo DESC
      LIMIT 1
    `, [type, series]);

    // Calcular nuevo correlativo
    const newCorrelative = rows.length === 0 ? 1 : rows[0].correlativo + 1;

    // Insertar nuevo comprobante con el correlativo calculado
    const [result] = await db.execute(`
      INSERT INTO comprobante (
        id_pedido, tipo, serie, correlativo,
        dni, ruc, razon_social, direccion, direccion_fiscal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderId,
      type,
      series,
      newCorrelative,
      dni,
      ruc,
      businessName,
      address,
      taxAddress
    ]);

    return {
      receiptId: result.insertId,
      orderId,
      type,
      series,
      correlative: newCorrelative,
      dni,
      ruc,
      businessName,
      address,
      taxAddress
    };
  },


  // Actualizar comprobante por ID
  update: async (id, data) => {
    const {
      orderId,
      type,
      series,
      correlative,
      dni,
      ruc,
      businessName,
      address,
      taxAddress,
    } = data;

    const [result] = await db.execute(`
      UPDATE comprobante SET
        id_pedido = ?,
        tipo = ?,
        serie = ?,
        correlativo = ?,
        dni = ?,
        ruc = ?,
        razon_social = ?,
        direccion = ?,
        direccion_fiscal = ?
      WHERE id_comprobante = ?
    `, [
      orderId,
      type,
      series,
      correlative,
      dni,
      ruc,
      businessName,
      address,
      taxAddress,
      id
    ]);

    return result.affectedRows > 0;
  },

  // Eliminar comprobante por ID
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM comprobante WHERE id_comprobante = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default Receipt;