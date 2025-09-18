import db from './db.js';

const TipoProducto = {
  // Obtener todos los tipos
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM tipo_producto');
    return rows;
  },

  // Obtener por ID
  getById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM tipo_producto WHERE id_tipo_producto = ?',
      [id]
    );
    return rows[0];
  },

  // Crear nuevo tipo
  create: async ({ nombre, imagen, id_categoria }) => {
    const [result] = await db.execute(
      'INSERT INTO tipo_producto (nombre, imagen, id_categoria) VALUES (?, ?, ?)',
      [nombre, imagen, id_categoria]
    );
    return {
      id_tipo_producto: result.insertId,
      nombre,
      imagen,
      id_categoria,
    };
  },

  // Actualizar tipo existente
  update: async (id, { nombre, imagen, id_categoria }) => {
    const [result] = await db.execute(
      'UPDATE tipo_producto SET nombre = ?, imagen = ?, id_categoria = ? WHERE id_tipo_producto = ?',
      [nombre, imagen, id_categoria, id]
    );
    return result.affectedRows > 0
      ? { id_tipo_producto: id, nombre, imagen, id_categoria }
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

export default TipoProducto;