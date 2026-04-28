import db from './db.js';

const ProductType = {
  // Obtener todos los tipos
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_producto');
    return rows.map(row => ({
      productTypeId: row.id_tipo_producto,
      name: row.nombre,
      image: row.imagen,
      categoryId: row.id_categoria
    }));
  },

  // Obtener por ID
  getById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM tipo_producto WHERE id_tipo_producto = ?',
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      productTypeId: row.id_tipo_producto,
      name: row.nombre,
      image: row.imagen,
      categoryId: row.id_categoria
    };
  },

  // Crear nuevo tipo
  create: async ({ name, image, categoryId }) => {
    const [result] = await db.execute(
      'INSERT INTO tipo_producto (nombre, imagen, id_categoria) VALUES (?, ?, ?)',
      [name, image, categoryId]
    );
    return {
      productTypeId: result.insertId,
      name,
      image,
      categoryId,
    };
  },

  // Actualizar tipo existente
  update: async (id, { name, image, categoryId }) => {
    const [result] = await db.execute(
      'UPDATE tipo_producto SET nombre = ?, imagen = ?, id_categoria = ? WHERE id_tipo_producto = ?',
      [name, image, categoryId, id]
    );
    return result.affectedRows > 0
      ? { productTypeId: id, name, image, categoryId }
      : null;
  },

  // Eliminar tipo
  delete: async (id) => {
    const [result] = await db.execute(
      'DELETE FROM tipo_producto WHERE id_tipo_producto = ?',
      [id]
    );
    return result.affectedRows > 0;
  },
};

export default ProductType;