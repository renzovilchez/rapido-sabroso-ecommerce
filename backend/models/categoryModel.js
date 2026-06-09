import prisma from '../prisma/client.js';

const Category = {
  getAll: async () => {
    return prisma.category.findMany({
      select: { categoryId: true, name: true },
    });
  },

  getById: async (id) => {
    return prisma.category.findUnique({ where: { categoryId: id } });
  },

  create: async (name) => {
    return prisma.category.create({
      data: { name },
      select: { categoryId: true, name: true },
    });
  },

  update: async (id, name) => {
    try {
      return await prisma.category.update({
        where: { categoryId: id },
        data: { name },
        select: { categoryId: true, name: true },
      });
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.category.delete({ where: { categoryId: id } });
      return true;
    } catch {
      return false;
    }
  },

  getCategoriesWithTypes: async () => {
    const categories = await prisma.category.findMany({
      include: {
        productTypes: {
          select: { productTypeId: true, name: true, image: true },
        },
      },
      orderBy: { categoryId: 'asc' },
    });

    return categories.map((c) => ({
      categoryId: c.categoryId,
      name: c.name,
      types: c.productTypes,
    }));
  },
};

export default Category;