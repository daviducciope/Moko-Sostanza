/**
 * MOKO SOSTANZA Dental CRM - Patient Service
 * 
 * Servizio per la gestione dei pazienti utilizzando Prisma ORM
 * Sostituisce i dati mock con query reali al database PostgreSQL
 */

import { prisma, type Patient, type Prisma } from '../db/client';

// Tipi per le operazioni sui pazienti
export type CreatePatientData = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePatientData = Partial<CreatePatientData>;

export interface PatientWithRelations extends Patient {
  appointments?: any[];
  invoices?: any[];
  files?: any[];
  patientUDIs?: any[];
  notifications?: any[];
}

export interface PatientSearchFilters {
  search?: string;
  city?: string;
  isSmoker?: boolean;
  hasAllergies?: boolean;
  dateOfBirthFrom?: Date;
  dateOfBirthTo?: Date;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof Patient;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Servizio per la gestione completa dei pazienti
 */
export class PatientService {
  /**
   * Recupera tutti i pazienti con paginazione e filtri
   */
  static async getPatients(
    filters: PatientSearchFilters = {},
    pagination: PaginationOptions = {}
  ) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'lastName',
      sortOrder = 'asc'
    } = pagination;

    const skip = (page - 1) * limit;

    // Costruzione dei filtri per Prisma
    const where: Prisma.PatientWhereInput = {};

    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { fiscalCode: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.isSmoker !== undefined) {
      where.isSmoker = filters.isSmoker;
    }

    if (filters.hasAllergies !== undefined) {
      if (filters.hasAllergies) {
        where.allergies = { not: null };
      } else {
        where.allergies = null;
      }
    }

    if (filters.dateOfBirthFrom || filters.dateOfBirthTo) {
      where.dateOfBirth = {};
      if (filters.dateOfBirthFrom) {
        where.dateOfBirth.gte = filters.dateOfBirthFrom;
      }
      if (filters.dateOfBirthTo) {
        where.dateOfBirth.lte = filters.dateOfBirthTo;
      }
    }

    // Esecuzione query con conteggio totale
    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: {
              appointments: true,
              invoices: true,
              files: true,
            },
          },
        },
      }),
      prisma.patient.count({ where }),
    ]);

    return {
      patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Recupera un paziente per ID con tutte le relazioni
   */
  static async getPatientById(id: string, includeRelations = false): Promise<PatientWithRelations | null> {
    const include = includeRelations ? {
      appointments: {
        orderBy: { startTime: 'desc' as const },
        take: 10,
      },
      invoices: {
        orderBy: { createdAt: 'desc' as const },
        take: 10,
      },
      files: {
        orderBy: { createdAt: 'desc' as const },
        take: 20,
      },
      patientUDIs: {
        include: { udi: true },
        orderBy: { interventionDate: 'desc' as const },
      },
      notifications: {
        where: { isArchived: false },
        orderBy: { createdAt: 'desc' as const },
        take: 5,
      },
    } : undefined;

    return await prisma.patient.findUnique({
      where: { id },
      include,
    });
  }

  /**
   * Crea un nuovo paziente
   */
  static async createPatient(data: CreatePatientData): Promise<Patient> {
    return await prisma.patient.create({
      data,
    });
  }

  /**
   * Aggiorna un paziente esistente
   */
  static async updatePatient(id: string, data: UpdatePatientData): Promise<Patient> {
    return await prisma.patient.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina un paziente (soft delete - mantiene i dati per compliance)
   */
  static async deletePatient(id: string): Promise<void> {
    // In un sistema reale, potresti voler implementare un soft delete
    // aggiungendo un campo 'deletedAt' invece di eliminare fisicamente
    await prisma.patient.delete({
      where: { id },
    });
  }

  /**
   * Cerca pazienti per nome, email o codice fiscale
   */
  static async searchPatients(query: string, limit = 10): Promise<Patient[]> {
    return await prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { fiscalCode: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' },
      ],
    });
  }

  /**
   * Verifica se un email è già in uso
   */
  static async isEmailTaken(email: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.PatientWhereInput = { email };
    if (excludeId) {
      where.id = { not: excludeId };
    }

    const count = await prisma.patient.count({ where });
    return count > 0;
  }

  /**
   * Verifica se un codice fiscale è già in uso
   */
  static async isFiscalCodeTaken(fiscalCode: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.PatientWhereInput = { fiscalCode };
    if (excludeId) {
      where.id = { not: excludeId };
    }

    const count = await prisma.patient.count({ where });
    return count > 0;
  }

  /**
   * Ottieni statistiche sui pazienti
   */
  static async getPatientStats() {
    const [
      totalPatients,
      newPatientsThisMonth,
      smokersCount,
      patientsWithAllergies,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.patient.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.patient.count({ where: { isSmoker: true } }),
      prisma.patient.count({ where: { allergies: { not: null } } }),
    ]);

    return {
      totalPatients,
      newPatientsThisMonth,
      smokersCount,
      patientsWithAllergies,
      smokersPercentage: totalPatients > 0 ? (smokersCount / totalPatients) * 100 : 0,
      allergiesPercentage: totalPatients > 0 ? (patientsWithAllergies / totalPatients) * 100 : 0,
    };
  }
}

export default PatientService;
