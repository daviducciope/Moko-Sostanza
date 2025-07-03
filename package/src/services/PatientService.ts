import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

export const PatientService = {
  getAll: async () => prisma.patient.findMany(),
  getById: async (id: string) => prisma.patient.findUnique({ where: { id } }),
  create: async (data: Parameters<typeof prisma.patient.create>[0]['data']) => prisma.patient.create({ data }),
  update: async (id: string, data: Parameters<typeof prisma.patient.update>[0]['data']) => prisma.patient.update({ where: { id }, data }),
  delete: async (id: string) => prisma.patient.delete({ where: { id } }),
}; 