import prisma from '../prisma/client.js';

const Menu = {
  async getAll() {
    const menus = await prisma.menu.findMany({
      include: {
        menuProducts: {
          include: {
            product: {
              include: {
                productType: {
                  include: { category: true },
                },
              },
            },
          },
        },
      },
    });

    return menus.map(m => ({
      menuId: m.menuId,
      name: m.name,
      description: m.description,
      image: m.image,
      price: m.price,
      category: m.category,
      products: m.menuProducts.map(mp => ({
        productId: mp.productId,
        name: mp.product.name,
        description: mp.product.description,
        image: mp.product.image,
        price: mp.product.price,
        type: mp.product.productType?.name || null,
        quantity: mp.quantity,
      })),
    }));
  },

  async create({ name, description, image, price, category }) {
    const menu = await prisma.menu.create({
      data: { name, description, image, price, category },
    });
    return { id: menu.menuId };
  },

  async update(id, { name, description, image, price, category }) {
    try {
      await prisma.menu.update({
        where: { menuId: id },
        data: { name, description, image, price, category },
      });
      return true;
    } catch {
      return false;
    }
  },

  async delete(id) {
    try {
      await prisma.menu.delete({ where: { menuId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default Menu;
