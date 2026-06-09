import prisma from '../prisma/client.js';
import { extractIGV } from '../helpers/tax.js';

const Order = {
  getAll: async () => {
    const orders = await prisma.order.findMany({
      include: {
        customer: { select: { firstName: true } },
        paymentMethod: { select: { name: true } },
      },
      orderBy: { date: 'desc' },
    });

    return orders.map(o => ({
      orderId: o.orderId,
      customerName: o.customer?.firstName || null,
      paymentMethod: o.paymentMethod?.name || null,
      date: o.date,
      subtotal: Number(o.subtotal || 0),
      tax: Number(o.tax || 0),
      discount: Number(o.discount || 0),
      total: Number(o.total || 0),
      deliveryAddress: o.deliveryAddress,
      shippingMethod: o.shippingMethod,
      notes: o.notes,
      pointsUsed: o.pointsUsed,
    }));
  },

  getById: async (id) => {
    const o = await prisma.order.findUnique({
      where: { orderId: id },
      include: {
        customer: { select: { firstName: true } },
        paymentMethod: { select: { name: true } },
      },
    });

    if (!o) return null;

    return {
      orderId: o.orderId,
      customerName: o.customer?.firstName || null,
      paymentMethod: o.paymentMethod?.name || null,
      date: o.date,
      subtotal: Number(o.subtotal || 0),
      tax: Number(o.tax || 0),
      discount: Number(o.discount || 0),
      total: Number(o.total || 0),
      deliveryAddress: o.deliveryAddress,
      shippingMethod: o.shippingMethod,
      notes: o.notes,
      pointsUsed: o.pointsUsed,
    };
  },

  create: async (orderData) => {
    const {
      customerId, paymentMethodId, deliveryAddress = null,
      shippingMethod = null, notes = null, discount = 0, pointsUsed = 0,
      products = [], combos = [],
      receiptType = 'boleta', dni = null, ruc = null,
      businessName = null, taxAddress = null,
    } = orderData;

    let total = 0;
    for (const item of products) total += item.price * item.quantity;
    for (const combo of combos) total += combo.price * combo.quantity;
    total = Math.max(0, total - discount);

    const tax = extractIGV(total);
    const subtotal = +(total - tax).toFixed(2);

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerId, paymentMethodId,
          subtotal, tax, discount, total,
          deliveryAddress, shippingMethod, notes, pointsUsed,
        },
      });

      const orderId = order.orderId;

      for (const item of products) {
        const product = await tx.product.findUnique({
          where: { productId: item.productId },
        });
        if (!product) throw new Error(`Producto con ID ${item.productId} no existe`);

        const itemSubtotal = +(item.price * item.quantity).toFixed(2);
        const itemTax = extractIGV(itemSubtotal);

        await tx.orderDetail.create({
          data: {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: itemSubtotal,
            tax: itemTax,
          },
        });
      }

      for (const combo of combos) {
        const comboSubtotal = +(combo.price * combo.quantity).toFixed(2);
        const comboTax = extractIGV(comboSubtotal);

        await tx.orderDetail.create({
          data: {
            orderId,
            menuId: combo.menuId,
            quantity: combo.quantity,
            price: combo.price,
            subtotal: comboSubtotal,
            tax: comboTax,
          },
        });
      }

      const lastReceipt = await tx.receipt.findFirst({
        where: { type: receiptType },
        orderBy: { correlative: 'desc' },
        select: { correlative: true },
      });

      const correlative = (lastReceipt?.correlative || 0) + 1;
      const series = receiptType === 'boleta' ? 'B001' : 'F001';

      await tx.receipt.create({
        data: {
          orderId,
          type: receiptType,
          series,
          correlative,
          dni, ruc,
          businessName,
          address: deliveryAddress,
          taxAddress,
        },
      });

      return { orderId, subtotal, tax, discount, total };
    });

    return {
      orderId: result.orderId,
      subtotal: result.subtotal,
      tax: result.tax,
      discount: result.discount,
      total: result.total,
      receipt: {
        type: receiptType,
        series: receiptType === 'boleta' ? 'B001' : 'F001',
        correlative: 1,
      },
    };
  },

  update: async (orderId, orderData) => {
    const {
      customerId, paymentMethodId, deliveryAddress, shippingMethod,
      notes, discount = 0, pointsUsed = 0,
      products = [], combos = [],
    } = orderData;

    let subtotal = 0;
    for (const p of products) subtotal += p.price * p.quantity;
    for (const c of combos) subtotal += c.price * c.quantity;

    const totalWithDiscount = Math.max(0, subtotal - discount);
    const tax = extractIGV(totalWithDiscount);
    const total = +totalWithDiscount.toFixed(2);

    try {
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { orderId },
          data: {
            customerId, paymentMethodId, subtotal, tax, discount, total,
            deliveryAddress, shippingMethod, notes, pointsUsed,
          },
        });

        await tx.orderDetail.deleteMany({ where: { orderId } });

        for (const product of products) {
          const prodSubtotal = +(product.price * product.quantity).toFixed(2);
          const prodTax = extractIGV(prodSubtotal);

          await tx.orderDetail.create({
            data: {
              orderId,
              productId: product.productId,
              quantity: product.quantity,
              price: product.price,
              subtotal: prodSubtotal,
              tax: prodTax,
            },
          });
        }

        for (const combo of combos) {
          const comboSubtotal = +(combo.price * combo.quantity).toFixed(2);
          const comboTax = extractIGV(comboSubtotal);

          await tx.orderDetail.create({
            data: {
              orderId,
              menuId: combo.menuId,
              quantity: combo.quantity,
              price: combo.price,
              subtotal: comboSubtotal,
              tax: comboTax,
            },
          });
        }
      });

      return { orderId, customerId, subtotal, tax, discount, total };
    } catch {
      return null;
    }
  },

  delete: async (orderId) => {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.receipt.deleteMany({ where: { orderId } });
        await tx.orderDetail.deleteMany({ where: { orderId } });
        await tx.order.delete({ where: { orderId } });
      });
      return true;
    } catch {
      return false;
    }
  },
};

export default Order;
