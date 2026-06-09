import prisma from '../prisma/client.js';

const PaymentMethod = {
  getAll: async (customerId = null) => {
    const where = customerId ? { customerId } : {};
    return prisma.paymentMethod.findMany({ where });
  },

  getById: async (id) => {
    return prisma.paymentMethod.findUnique({ where: { paymentMethodId: id } });
  },

  create: async ({ customerId, name, number }) => {
    return prisma.paymentMethod.create({
      data: { customerId, name, number },
    });
  },

  update: async (id, { customerId, name, number }) => {
    try {
      return await prisma.paymentMethod.update({
        where: { paymentMethodId: id },
        data: { customerId, name, number },
      });
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.paymentMethod.delete({ where: { paymentMethodId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default PaymentMethod;
