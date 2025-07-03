import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

export const NotificationService = {
  getAll: async () => prisma.notification.findMany(),
  getById: async (id: string) => prisma.notification.findUnique({ where: { id } }),
  create: async (data: Parameters<typeof prisma.notification.create>[0]['data']) => prisma.notification.create({ data }),
  update: async (id: string, data: Parameters<typeof prisma.notification.update>[0]['data']) => prisma.notification.update({ where: { id }, data }),
  delete: async (id: string) => prisma.notification.delete({ where: { id } }),
}; 