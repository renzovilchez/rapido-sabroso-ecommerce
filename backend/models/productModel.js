import prisma from '../prisma/client.js';

const Product = {
  getAll: async () => {
    const products = await prisma.product.findMany({
      include: {
        productType: {
          select: { name: true },
        },
      },
    });

    return products.map(p => ({
      productId: p.productId,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image: p.image,
      productType: p.productType?.name || null,
      productCategory: null,
    }));
  },

  getById: async (id) => {
    const p = await prisma.product.findUnique({
      where: { productId: id },
      include: {
        productType: {
          select: { name: true },
        },
      },
    });
    if (!p) return null;

    return {
      productId: p.productId,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image: p.image,
      productType: p.productType?.name || null,
      productCategory: null,
    };
  },

  create: async (name, description, price, image, stock, productTypeId) => {
    const product = await prisma.product.create({
      data: { name, description, price, image, stock, productTypeId },
    });
    return {
      productId: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      productTypeId: product.productTypeId,
    };
  },

  update: async (id, name, description, price, image, stock, productTypeId) => {
    try {
      const product = await prisma.product.update({
        where: { productId: id },
        data: { name, description, price, image, stock, productTypeId },
      });
      return {
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        productTypeId: product.productTypeId,
      };
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.product.delete({ where: { productId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default Product;
