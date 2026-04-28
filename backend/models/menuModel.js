import db from './db.js';

const Menu = {
    // Obtener todos los combos con sus productos
    async getAll() {
        const [rows] = await db.query(`
      SELECT 
        m.id_menu,
        m.nombre,
        m.descripcion,
        m.imagen,
        m.precio,
        m.tipo_menu,
        mp.id_producto, 
        mp.cantidad,
        p.nombre AS product_name,
        p.descripcion AS product_description,
        p.imagen AS product_image,
        p.precio AS product_price,
        tp.nombre AS product_type,
        c.nombre AS category
        FROM menu m
        LEFT JOIN menu_producto mp ON m.id_menu = mp.id_menu
        LEFT JOIN producto p ON mp.id_producto = p.id_producto
        LEFT JOIN tipo_producto tp ON p.id_tipo_producto = tp.id_tipo_producto
        LEFT JOIN categoria c ON tp.id_categoria = c.id_categoria;
    `);

        // Agrupar productos por combo
        const bundles = {};
        for (const row of rows) {
            const id = row.id_menu;
            if (!bundles[id]) {
                bundles[id] = {
                    menuId: row.id_menu,
                    name: row.nombre,
                    description: row.descripcion,
                    image: row.imagen,
                    price: row.precio,
                    category: row.tipo_menu,
                    products: [],
                };
            }

            if (row.id_producto) {
                bundles[id].products.push({
                    productId: row.id_producto,
                    name: row.product_name,
                    description: row.product_description,
                    image: row.product_image,
                    price: row.product_price,
                    type: row.product_type,
                    quantity: row.cantidad,
                });
            }
        }

        return Object.values(bundles);
    },

    // Crear un nuevo combo
    async create({ name, description, image, price, category }) {
        const [result] = await db.query(
            'INSERT INTO menu (nombre, descripcion, imagen, precio, tipo_menu) VALUES (?, ?, ?, ?, ?)',
            [name, description, image, price, category]
        );
        return { id: result.insertId };
    },

    // Actualizar un combo existente
    async update(id, { name, description, image, price, category }) {
        const [result] = await db.query(
            'UPDATE menu SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, tipo_menu = ? WHERE id_menu = ?',
            [name, description, image, price, category, id]
        );
        return result.affectedRows > 0;
    },

    // Eliminar un combo
    async delete(id) {
        const [result] = await db.query('DELETE FROM menu WHERE id_menu = ?', [id]);
        return result.affectedRows > 0;
    },
};

export default Menu;