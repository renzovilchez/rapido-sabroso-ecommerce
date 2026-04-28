import db from "./db.js";

const Order = {
  // Obtener todos los pedidos con JOINs
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_pedido,
        c.nombre AS customer_name,
        mp.nombre AS payment_method,
        p.fecha,
        p.subtotal,
        p.igv,
        p.descuento,
        p.total,
        p.direccion_entrega,
        p.metodo_envio,
        p.notas,
        p.puntos_usados
      FROM pedido p
      JOIN cliente c ON p.id_cliente = c.id_cliente
      JOIN metodo_pago mp ON p.id_metodo_pago = mp.id_metodo_pago
      ORDER BY p.fecha DESC
    `);
    
    return rows.map(row => ({
      orderId: row.id_pedido,
      customerName: row.customer_name,
      paymentMethod: row.payment_method,
      date: row.fecha,
      subtotal: row.subtotal,
      tax: row.igv,
      discount: row.descuento,
      total: row.total,
      deliveryAddress: row.direccion_entrega,
      shippingMethod: row.metodo_envio,
      notes: row.notas,
      pointsUsed: row.puntos_usados
    }));
  },

  // Obtener un pedido por ID con JOINs
  getById: async (id) => {
    const [rows] = await db.execute(
      `
      SELECT 
        p.id_pedido,
        c.nombre AS customer_name,
        mp.nombre AS payment_method,
        p.fecha,
        p.subtotal,
        p.igv,
        p.descuento,
        p.total,
        p.direccion_entrega,
        p.metodo_envio,
        p.notas,
        p.puntos_usados
      FROM pedido p
      JOIN cliente c ON p.id_cliente = c.id_cliente
      JOIN metodo_pago mp ON p.id_metodo_pago = mp.id_metodo_pago
      WHERE p.id_pedido = ?
    `,
      [id],
    );
    
    if (rows.length === 0) return null;
    const row = rows[0];
    
    return {
      orderId: row.id_pedido,
      customerName: row.customer_name,
      paymentMethod: row.payment_method,
      date: row.fecha,
      subtotal: row.subtotal,
      tax: row.igv,
      discount: row.descuento,
      total: row.total,
      deliveryAddress: row.direccion_entrega,
      shippingMethod: row.metodo_envio,
      notes: row.notas,
      pointsUsed: row.puntos_usados
    };
  },

  create: async (orderData) => {
    const {
      customerId,
      paymentMethodId,
      deliveryAddress = null,
      shippingMethod = null,
      notes = null,
      discount = 0,
      pointsUsed = 0,
      products = [],
      combos = [],
      receiptType = "boleta",
      dni = null,
      ruc = null,
      businessName = null, // razon_social
      taxAddress = null, // direccion_fiscal
    } = orderData;

    let total = 0;

    for (const item of products) {
      total += item.price * item.quantity;
    }

    for (const combo of combos) {
      total += combo.price * combo.quantity;
    }

    total = Math.max(0, total - discount);
    const tax = +(total * 0.18).toFixed(2);
    const subtotal = +(total - tax).toFixed(2);

    try {
      const [orderResult] = await db.execute(
        `
      INSERT INTO pedido (
        id_cliente, id_metodo_pago, subtotal, igv, descuento, total,
        direccion_entrega, metodo_envio, notas, puntos_usados
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
        [
          customerId,
          paymentMethodId,
          subtotal,
          tax,
          discount,
          total,
          deliveryAddress,
          shippingMethod,
          notes,
          pointsUsed,
        ],
      );

      const orderId = orderResult.insertId;

      for (const item of products) {
        const [existingProduct] = await db.execute(
          "SELECT id_producto FROM producto WHERE id_producto = ?",
          [item.productId],
        );
        if (existingProduct.length === 0) {
          throw new Error(`Producto con ID ${item.productId} no existe`);
        }

        const itemSubtotal = +(item.price * item.quantity).toFixed(2);
        const itemTax = +((itemSubtotal * 18) / 118).toFixed(2);

        await db.execute(
          `
        INSERT INTO detalle_pedido (
          id_pedido, id_producto, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `,
          [
            orderId,
            item.productId,
            item.quantity,
            item.price,
            itemSubtotal,
            itemTax,
          ],
        );
      }

      for (const combo of combos) {
        const comboSubtotal = +(combo.price * combo.quantity).toFixed(2);
        const comboTax = +((comboSubtotal * 18) / 118).toFixed(2);

        await db.execute(
          `
        INSERT INTO detalle_pedido (
          id_pedido, id_menu, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `,
          [
            orderId,
            combo.menuId,
            combo.quantity,
            combo.price,
            comboSubtotal,
            comboTax,
          ],
        );
      }

      const [receiptCountRows] = await db.execute(
        `
      SELECT COUNT(*) AS count FROM comprobante WHERE tipo = ?
    `,
        [receiptType],
      );

      const correlative = receiptCountRows[0].count + 1;
      const series = receiptType === "boleta" ? "B001" : "F001";

      await db.execute(
        `
      INSERT INTO comprobante (
        id_pedido, tipo, serie, correlativo, dni, ruc, razon_social,
        direccion, direccion_fiscal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
        [
          orderId,
          receiptType,
          series,
          correlative,
          dni,
          ruc,
          businessName,
          deliveryAddress,
          taxAddress,
        ],
      );

      return {
        orderId,
        subtotal,
        tax,
        discount,
        total,
        receipt: {
          type: receiptType,
          series,
          correlative,
        },
      };
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      throw new Error("No se pudo registrar el pedido");
    }
  },

  // Actualizar un pedido
  update: async (orderId, orderData) => {
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
    } = orderData;

    let subtotal = 0;
    for (const p of products) {
      subtotal += p.price * p.quantity;
    }
    for (const c of combos) {
      subtotal += c.price * c.quantity;
    }

    const totalWithDiscount = Math.max(0, subtotal - discount);
    const tax = +((totalWithDiscount * 18) / 118).toFixed(2);
    const total = +totalWithDiscount.toFixed(2);

    try {
      const [result] = await db.execute(
        `
      UPDATE pedido SET
        id_cliente = ?, id_metodo_pago = ?, subtotal = ?, igv = ?, descuento = ?, total = ?,
        direccion_entrega = ?, metodo_envio = ?, notas = ?, puntos_usados = ?
      WHERE id_pedido = ?
    `,
        [
          customerId,
          paymentMethodId,
          subtotal,
          tax,
          discount,
          total,
          deliveryAddress,
          shippingMethod,
          notes,
          pointsUsed,
          orderId,
        ],
      );

      if (result.affectedRows === 0) return null;

      await db.execute("DELETE FROM detalle_pedido WHERE id_pedido = ?", [
        orderId,
      ]);

      for (const product of products) {
        const prodSubtotal = +(product.price * product.quantity).toFixed(2);
        const prodTax = +((prodSubtotal * 18) / 118).toFixed(2);

        await db.execute(
          `
        INSERT INTO detalle_pedido (
          id_pedido, id_producto, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `,
          [
            orderId,
            product.productId,
            product.quantity,
            product.price,
            prodSubtotal,
            prodTax,
          ],
        );
      }

      for (const combo of combos) {
        const comboSubtotal = +(combo.price * combo.quantity).toFixed(2);
        const comboTax = +((comboSubtotal * 18) / 118).toFixed(2);

        await db.execute(
          `
        INSERT INTO detalle_pedido (
          id_pedido, id_menu, cantidad, precio, subtotal, igv
        ) VALUES (?, ?, ?, ?, ?, ?)
      `,
          [
            orderId,
            combo.menuId,
            combo.quantity,
            combo.price,
            comboSubtotal,
            comboTax,
          ],
        );
      }

      return {
        orderId,
        customerId,
        subtotal,
        tax,
        discount,
        total,
      };
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      throw new Error("No se pudo actualizar el pedido");
    }
  },

  // Eliminar un pedido
  delete: async (orderId) => {
    try {
      await db.execute("DELETE FROM comprobante WHERE id_pedido = ?", [
        orderId,
      ]);
      await db.execute("DELETE FROM detalle_pedido WHERE id_pedido = ?", [
        orderId,
      ]);

      const [result] = await db.execute(
        "DELETE FROM pedido WHERE id_pedido = ?",
        [orderId],
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
      throw new Error("No se pudo eliminar el pedido");
    }
  },
};

export default Order;
