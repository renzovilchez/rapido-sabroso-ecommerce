import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

const Admin = {
  getAll: async () => {
    return prisma.admin.findMany({
      select: { adminId: true, name: true, email: true },
    });
  },

  getById: async (id) => {
    return prisma.admin.findUnique({ where: { adminId: id } });
  },

  login: async (email, password) => {
    const admin = await Admin.getByEmail(email);
    if (!admin) return null;

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return null;

    const { password: _, ...safeData } = admin;
    return safeData;
  },

  getByEmail: async (email) => {
    return prisma.admin.findUnique({ where: { email } });
  },

  create: async (name, email, password) => {
    return prisma.admin.create({
      data: { name, email, password },
      select: { adminId: true, name: true, email: true },
    });
  },

  update: async (id, name, email, password) => {
    try {
      return await prisma.admin.update({
        where: { adminId: id },
        data: { name, email, password },
        select: { adminId: true, name: true, email: true },
      });
    } catch {
      return null;
    }
  },

  delete: async (id) => {
    try {
      await prisma.admin.delete({ where: { adminId: id } });
      return true;
    } catch {
      return false;
    }
  },
};

export default Admin;