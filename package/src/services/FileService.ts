import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

export const FileService = {
  getAll: async () => prisma.file.findMany(),
  getById: async (id: string) => prisma.file.findUnique({ where: { id } }),
  create: async (data: Parameters<typeof prisma.file.create>[0]['data']) => prisma.file.create({ data }),
  update: async (id: string, data: Parameters<typeof prisma.file.update>[0]['data']) => prisma.file.update({ where: { id }, data }),
  delete: async (id: string) => prisma.file.delete({ where: { id } }),
}; 