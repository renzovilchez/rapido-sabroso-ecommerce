import prisma from '../prisma/client.js';
import { extractIGV } from '../helpers/tax.js';

const OrderDetail = {
  getAll: async () => {
    return prisma.orderDetail.findMany();
  },

  getById: async (id) => {
    return prisma.orderDetail.findUnique({ where: { orderDetailId: id } });
  },

  create: async (orderId, productId, quantity, price) => {
    const subtotal = quantity * price;
    const tax = extractIGV(subtotal);

    const detail = await prisma.orderDetail.create({
      data: {
        orderId,
        productId,
        quantity,
        price,
        subtotal,
        tax,
      },
    });

    return detail;
  },

  update: async (id, orderId, productId, quantity, price) => {
    const subtotal = quantity * price;
    const tax = extractIGV(subtotal);

    try {
      return await prisma.orderDetail.update({
        where: { orderDetailId: id },
        data: { orderId, productId, quantity, price, subtotal, tax },
      });
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.orderDetail.delete({ where: { orderDetailId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default OrderDetail;
