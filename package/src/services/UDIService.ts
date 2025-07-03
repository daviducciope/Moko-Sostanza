import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

export const UDIService = {
  getAll: async () => prisma.uDI.findMany(),
  getById: async (id: string) => prisma.uDI.findUnique({ where: { id } }),
  create: async (data: Parameters<typeof prisma.uDI.create>[0]['data']) => prisma.uDI.create({ data }),
  update: async (id: string, data: Parameters<typeof prisma.uDI.update>[0]['data']) => prisma.uDI.update({ where: { id }, data }),
  delete: async (id: string) => prisma.uDI.delete({ where: { id } }),
}; 