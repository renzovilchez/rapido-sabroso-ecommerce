import db from './db.js';

const ProductCategory = {
  // Obtener todas las relaciones entre productos y categorías con nombres
  getAll: async () => {
    const [rows] = await db.execute(`
      SELECT 
        pc.idProducto, 
        p.nombreProducto AS productName, 
        c.nombreCategoria AS categoryName
      FROM producto_categoria pc
      JOIN producto p ON pc.idProducto = p.idProducto
      JOIN categoria c ON pc.idCategoria = c.idCategoria
    `);
    
    return rows.map(row => ({
      productId: row.idProducto,
      productName: row.productName,
      categoryName: row.categoryName
    }));
  },

  // Obtener una relación entre producto y categoría
  getById: async (productId, categoryId) => {
    const [rows] = await db.execute(
      `SELECT 
        pc.idProducto, 
        p.nombreProducto AS productName,
        c.nombreCategoria AS categoryName
      FROM producto_categoria pc
      JOIN producto p ON pc.idProducto = p.idProducto
      JOIN categoria c ON pc.idCategoria = c.idCategoria
      WHERE pc.idProducto = ? AND pc.idCategoria = ?`,
      [productId, categoryId]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      productId: row.idProducto,
      productName: row.productName,
      categoryName: row.categoryName
    };
  },

  getCategoriesByType: async () => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          tp.nombreTipoProducto AS productTypeName, 
          c.nombreCategoria AS categoryName,
          c.imagenCategoria AS categoryImage
        FROM producto_categoria pc
        JOIN producto p ON pc.idProducto = p.idProducto
        JOIN tipo_producto tp ON p.idTipoProducto = tp.idTipoProducto
        JOIN categoria c ON pc.idCategoria = c.idCategoria
        ORDER BY tp.nombreTipoProducto, c.nombreCategoria;
      `);
  
      // Agrupar manualmente
      const grouped = {};
  
      rows.forEach(row => {
        const type = row.productTypeName;
        const category = row.categoryName;
        const image = row.categoryImage;
  
        if (!grouped[type]) {
          grouped[type] = [];
        }
  
        // Verificar si la categoría ya existe para no duplicarla
        if (!grouped[type].some(c => c.categoryName === category)) {
          grouped[type].push({ categoryName: category, categoryImage: image });
        }
      });
  
      // Convertir a formato de array
      const result = Object.entries(grouped).map(([productType, categories]) => ({
        productType,
        categories
      }));
  
      return result;
    } catch (error) {
      console.error('Error al obtener categorías por tipo:', error);
      throw error;
    }
  },  

  // Crear una nueva relación entre producto y categoría
  create: async (productId, categoryId) => {
    const [result] = await db.execute(
      'INSERT INTO producto_categoria (idProducto, idCategoria) VALUES (?, ?)',
      [productId, categoryId]
    );
    return {
      productId,
      categoryId
    };
  },

  // Eliminar una relación entre producto y categoría
  delete: async (productId, categoryId) => {
    const [result] = await db.execute(
      'DELETE FROM producto_categoria WHERE idProducto = ? AND idCategoria = ?',
      [productId, categoryId]
    );
    return result.affectedRows > 0;
  },
};

export default ProductCategory;