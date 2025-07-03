import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

export const InvoiceService = {
  getAll: async () => prisma.invoice.findMany(),
  getById: async (id: string) => prisma.invoice.findUnique({ where: { id } }),
  create: async (data: Parameters<typeof prisma.invoice.create>[0]['data']) => prisma.invoice.create({ data }),
  update: async (id: string, data: Parameters<typeof prisma.invoice.update>[0]['data']) => prisma.invoice.update({ where: { id }, data }),
  delete: async (id: string) => prisma.invoice.delete({ where: { id } }),
}; 