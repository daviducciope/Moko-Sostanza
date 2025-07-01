/**
 * MOKO SOSTANZA Dental CRM - Prisma Database Client
 * 
 * Client Prisma configurato per l'applicazione dental con:
 * - Singleton pattern per evitare multiple connessioni
 * - Logging configurato per development/production
 * - Supporto per hot reload in development
 * - Preparato per Prisma Accelerate e connection pooling
 */

import { PrismaClient } from '@prisma/client';

// Estendi il tipo globale per supportare il singleton pattern
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Configurazione del client Prisma con logging appropriato per l'ambiente
 */
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    
    // Configurazioni per ottimizzazione delle performance
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

/**
 * Client Prisma singleton
 * 
 * In development: utilizza globalThis per mantenere la connessione durante hot reload
 * In production: crea una nuova istanza per ogni deployment
 * 
 * Per produzione con Vercel/AWS Lambda, considera l'uso di:
 * - Prisma Accelerate per connection pooling globale
 * - RDS Proxy per gestione connessioni con Amazon RDS
 */
export const prisma = globalThis.prisma || createPrismaClient();

// In development, salva il client nel global scope per hot reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

/**
 * Utility per disconnettere il client (utile per testing e cleanup)
 */
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

/**
 * Utility per verificare la connessione al database
 */
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    return { 
      success: false, 
      message: 'Database connection failed', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Utility per eseguire transazioni sicure
 * 
 * Esempio d'uso:
 * ```typescript
 * const result = await executeTransaction(async (tx) => {
 *   const patient = await tx.patient.create({ data: patientData });
 *   const appointment = await tx.appointment.create({ 
 *     data: { ...appointmentData, patientId: patient.id } 
 *   });
 *   return { patient, appointment };
 * });
 * ```
 */
export const executeTransaction = async <T>(
  fn: (prisma: PrismaClient) => Promise<T>
): Promise<T> => {
  return await prisma.$transaction(fn);
};

// Export dei tipi Prisma per uso nell'applicazione
export type {
  Patient,
  UDI,
  PatientUDI,
  Appointment,
  Invoice,
  File,
  Notification,
  Prisma,
} from '@prisma/client';

// Export di tipi utili per le query
export type {
  PrismaClient,
} from '@prisma/client';
