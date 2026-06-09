import prisma from '../prisma/client.js';

const ProductCategory = {
  getAll: async () => {
    const rows = await prisma.productCategory.findMany({
      include: {
        product: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
    return rows.map(r => ({
      productId: r.productId,
      productName: r.product.name,
      categoryName: r.category.name,
    }));
  },

  getById: async (productId, categoryId) => {
    const r = await prisma.productCategory.findUnique({
      where: { productId_categoryId: { productId, categoryId } },
      include: {
        product: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
    if (!r) return null;
    return {
      productId: r.productId,
      productName: r.product.name,
      categoryName: r.category.name,
    };
  },

  getCategoriesByType: async () => {
    const rows = await prisma.productCategory.findMany({
      include: {
        product: {
          include: { productType: true },
        },
        category: true,
      },
      orderBy: [
        { product: { productType: { name: 'asc' } } },
        { category: { name: 'asc' } },
      ],
    });

    const grouped = {};
    for (const r of rows) {
      const type = r.product.productType?.name;
      if (!type) continue;
      if (!grouped[type]) grouped[type] = [];
      const exists = grouped[type].some(
        c => c.categoryName === r.category.name
      );
      if (!exists) {
        grouped[type].push({
          categoryName: r.category.name,
          categoryImage: null,
        });
      }
    }

    return Object.entries(grouped).map(([productType, categories]) => ({
      productType,
      categories,
    }));
  },

  create: async (productId, categoryId) => {
    await prisma.productCategory.create({
      data: { productId, categoryId },
    });
    return { productId, categoryId };
  },

  delete: async (productId, categoryId) => {
    try {
      await prisma.productCategory.delete({
        where: { productId_categoryId: { productId, categoryId } },
      });
      return true;
    } catch {
      return false;
    }
  },
};

export default ProductCategory;
