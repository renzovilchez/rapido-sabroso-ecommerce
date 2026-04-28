import db from './db.js';

const Category = {
  // Obtener todas las categorías
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM categoria');
    return rows.map(row => ({
      categoryId: row.id_categoria,
      name: row.nombre
    }));
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      categoryId: row.id_categoria,
      name: row.nombre
    };
  },

  // Crear una nueva categoría
  create: async (name) => {
    const [result] = await db.execute(
      'INSERT INTO categoria (nombre) VALUES (?)',
      [name]
    );
    return { categoryId: result.insertId, name };
  },

  // Actualizar una categoría
  update: async (id, name) => {
    const [result] = await db.execute(
      'UPDATE categoria SET nombre = ? WHERE id_categoria = ?',
      [name, id]
    );
    return result.affectedRows > 0 ? { categoryId: id, name } : null;
  },

  // Eliminar una categoría
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM categoria WHERE id_categoria = ?', [id]);
    return result.affectedRows > 0;
  },

  // Obtener categorías con sus tipos de producto
  getCategoriesWithTypes: async () => {
    const [rows] = await db.query(`
      SELECT 
        c.id_categoria, 
        c.nombre AS categoryName,
        t.id_tipo_producto, 
        t.nombre AS typeName,
        t.imagen
      FROM categoria c
      LEFT JOIN tipo_producto t ON t.id_categoria = c.id_categoria
      ORDER BY c.id_categoria, t.id_tipo_producto
    `);

    // Reorganizar los datos por categoría
    const categories = {};
    for (const row of rows) {
      const { id_categoria, categoryName, id_tipo_producto, typeName, imagen } = row;

      if (!categories[id_categoria]) {
        categories[id_categoria] = {
          categoryId: id_categoria,
          name: categoryName,
          types: []
        };
      }

      if (id_tipo_producto) {
        categories[id_categoria].types.push({
          typeId: id_tipo_producto,
          name: typeName,
          image: imagen
        });
      }
    }

    return Object.values(categories);
  }
};

export default Category;