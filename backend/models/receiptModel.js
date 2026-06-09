import prisma from '../prisma/client.js';

const Receipt = {
  getAll: async () => {
    const rows = await prisma.receipt.findMany({
      include: {
        order: {
          select: { total: true },
        },
      },
      orderBy: { date: 'desc' },
    });

    return rows.map(r => ({
      receiptId: r.receiptId,
      orderId: r.orderId,
      type: r.type,
      series: r.series,
      correlative: r.correlative,
      dni: r.dni,
      ruc: r.ruc,
      businessName: r.businessName,
      address: r.address,
      taxAddress: r.taxAddress,
      date: r.date,
      orderTotal: r.order?.total || 0,
    }));
  },

  getByOrderId: async (orderId) => {
    const receipt = await prisma.receipt.findFirst({
      where: { orderId },
      include: {
        order: {
          include: {
            customer: true,
            orderDetails: {
              include: {
                product: { select: { name: true } },
                menu: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    if (!receipt) return null;

    const o = receipt.order;
    const c = o.customer;

    const items = o.orderDetails.map(d => ({
      type: d.productId ? 'product' : 'menu',
      id: d.productId || d.menuId,
      name: d.product?.name || d.menu?.name || '',
      quantity: d.quantity,
      unitPrice: d.price,
      subtotal: d.subtotal,
      tax: d.tax,
    }));

    return {
      receiptId: receipt.receiptId,
      receiptType: receipt.type,
      receiptNumber: `${receipt.series}-${String(receipt.correlative).padStart(8, '0')}`,
      issueDate: receipt.date,
      customer: {
        name: `${c.firstName} ${c.lastName || ''}`.trim(),
        documentType: c.documentType,
        dni: receipt.dni || c.dni,
        ruc: receipt.ruc || c.ruc,
        businessName: receipt.businessName || c.businessName,
        taxAddress: receipt.taxAddress || c.taxAddress,
      },
      items,
      totals: {
        subtotal: Number(o.subtotal || 0),
        tax: Number(o.tax || 0),
        discount: Number(o.discount || 0),
        total: Number(o.total || 0),
      },
    };
  },

  getByCustomerId: async (customerId) => {
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        receipts: true,
      },
    });

    const receipts = [];
    for (const o of orders) {
      for (const r of o.receipts) {
        receipts.push({
          receiptId: r.receiptId,
          orderId: r.orderId,
          type: r.type,
          series: r.series,
          correlative: r.correlative,
          dni: r.dni,
          ruc: r.ruc,
          businessName: r.businessName,
          address: r.address,
          taxAddress: r.taxAddress,
          date: r.date,
          orderTotal: o.total,
        });
      }
    }

    return receipts.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  create: async (data) => {
    const {
      orderId, type, series,
      dni = null, ruc = null,
      businessName = null, address = null, taxAddress = null,
    } = data;

    const lastReceipt = await prisma.receipt.findFirst({
      where: { type, series },
      orderBy: { correlative: 'desc' },
      select: { correlative: true },
    });

    const newCorrelative = (lastReceipt?.correlative || 0) + 1;

    const receipt = await prisma.receipt.create({
      data: {
        orderId, type, series,
        correlative: newCorrelative,
        dni, ruc, businessName, address, taxAddress,
      },
    });

    return receipt;
  },

  update: async (id, data) => {
    const {
      orderId, type, series, correlative,
      dni, ruc, businessName, address, taxAddress,
    } = data;

    try {
      await prisma.receipt.update({
        where: { receiptId: id },
        data: { orderId, type, series, correlative, dni, ruc, businessName, address, taxAddress },
      });
      return true;
    } catch {
      return false;
    }
  },

  delete: async (id) => {
    try {
      await prisma.receipt.delete({ where: { receiptId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default Receipt;
