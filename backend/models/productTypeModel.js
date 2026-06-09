import prisma from '../prisma/client.js';

const ProductType = {
  getAll: async () => {
    return prisma.productType.findMany();
  },

  getById: async (id) => {
    return prisma.productType.findUnique({ where: { productTypeId: id } });
  },

  create: async ({ name, image, categoryId }) => {
    return prisma.productType.create({
      data: { name, image, categoryId },
    });
  },

  update: async (id, { name, image, categoryId }) => {
    try {
      return await prisma.productType.update({
        where: { productTypeId: id },
        data: { name, image, categoryId },
      });
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.productType.delete({ where: { productTypeId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default ProductType;
