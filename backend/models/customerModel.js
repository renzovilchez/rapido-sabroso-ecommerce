import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

const Customer = {
  getAll: async () => {
    return prisma.customer.findMany({
      select: {
        customerId: true, firstName: true, lastName: true, email: true,
        points: true, documentType: true, dni: true, ruc: true,
        businessName: true, address: true, taxAddress: true,
      },
    });
  },

  getById: async (id) => {
    return prisma.customer.findUnique({ where: { customerId: id } });
  },

  getByEmail: async (email) => {
    return prisma.customer.findUnique({ where: { email } });
  },

  login: async (email, password) => {
    const customer = await Customer.getByEmail(email);
    if (!customer) return null;

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return null;

    const { password: _, ...safeData } = customer;
    return safeData;
  },

  create: async ({
    firstName, lastName, email, password,
    documentType = null, dni = null, ruc = null,
    businessName = null, address = null, taxAddress = null,
  }) => {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName, lastName, email, password,
        documentType, dni, ruc, businessName, address, taxAddress,
      },
    });
    const { password: _, ...safeData } = newCustomer;
    return safeData;
  },

  update: async (customerId, data) => {
    const {
      firstName, lastName, email, documentType, dni, ruc,
      businessName, address, taxAddress, password,
    } = data;

    const updateData = { firstName, lastName, email, documentType, dni, ruc, businessName, address, taxAddress };
    if (password) updateData.password = password;

    const updatedCustomer = await prisma.customer.update({
      where: { customerId },
      data: updateData,
    });
    const { password: _, ...safeData } = updatedCustomer;
    return safeData;
  },

  updatePoints: async (customerId, points) => {
    try {
      await prisma.customer.update({
        where: { customerId },
        data: { points },
      });
      return true;
    } catch {
      return false;
    }
  },

  delete: async (customerId) => {
    try {
      await prisma.customer.delete({ where: { customerId } });
      return true;
    } catch {
      return false;
    }
  },
};

export default Customer;