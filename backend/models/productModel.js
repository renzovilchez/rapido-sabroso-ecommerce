import db from './db.js';

const Product = {
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        p.imagen,
        tp.nombre AS productType, 
        c.nombre AS productCategory
      FROM producto p
      JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
      LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria;
    `);
    
    return rows.map(row => ({
      productId: row.id_producto,
      name: row.nombre,
      description: row.descripcion,
      price: row.precio,
      stock: row.stock,
      image: row.imagen,
      productType: row.productType,
      productCategory: row.productCategory
    }));
  },

  getById: async (id) => {
    const [rows] = await db.execute(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.descripcion, 
        p.precio, 
        p.stock, 
        p.imagen,
        tp.nombre AS productType, 
        c.nombre AS productCategory
      FROM producto p
      JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
      LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria
      WHERE p.id_producto = ?
    `, [id]);

    if (rows.length === 0) return null;
    
    const row = rows[0];
    return {
      productId: row.id_producto,
      name: row.nombre,
      description: row.descripcion,
      price: row.precio,
      stock: row.stock,
      image: row.image,
      productType: row.productType,
      productCategory: row.productCategory
    };
  },

  create: async (name, description, price, image, stock, productTypeId) => {
    const [result] = await db.execute(`
      INSERT INTO producto (nombre, descripcion, precio, imagen, stock, id_tipo_producto)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, image, stock, productTypeId]
    );
    return {
      productId: result.insertId,
      name,
      description,
      price,
      image,
      stock,
      productTypeId
    };
  },

  update: async (id, name, description, price, image, stock, productTypeId) => {
    const [result] = await db.execute(`
      UPDATE producto 
      SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, stock = ?, id_tipo_producto = ?
      WHERE id_producto = ?`,
      [name, description, price, image, stock, productTypeId, id]
    );
    return result.affectedRows > 0 ? {
      productId: id,
      name,
      description,
      price,
      image,
      stock,
      productTypeId
    } : null;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM producto WHERE id_producto = ?', [id]);
    return result.affectedRows > 0;
  },
};

export default Product;