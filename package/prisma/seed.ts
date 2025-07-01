/**
 * MOKO SOSTANZA Dental CRM - Database Seed
 * 
 * Script per popolare il database con dati di esempio
 * Eseguire con: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniziando il seeding del database...');

  // Pulisci il database esistente
  await prisma.notification.deleteMany();
  await prisma.file.deleteMany();
  await prisma.patientUDI.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.udi.deleteMany();
  await prisma.patient.deleteMany();

  console.log('🧹 Database pulito');

  // Crea pazienti di esempio
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        firstName: 'Mario',
        lastName: 'Rossi',
        email: 'mario.rossi@email.com',
        phone: '+39 333 1234567',
        dateOfBirth: new Date('1980-05-15'),
        fiscalCode: 'RSSMRA80E15H501Z',
        address: 'Via Roma 123',
        city: 'Milano',
        postalCode: '20100',
        province: 'MI',
        medicalHistory: 'Nessuna patologia significativa',
        allergies: 'Penicillina',
        isSmoker: false,
      },
    }),
    prisma.patient.create({
      data: {
        firstName: 'Giulia',
        lastName: 'Bianchi',
        email: 'giulia.bianchi@email.com',
        phone: '+39 333 2345678',
        dateOfBirth: new Date('1992-08-22'),
        fiscalCode: 'BNCGLI92M62F205X',
        address: 'Corso Italia 45',
        city: 'Roma',
        postalCode: '00100',
        province: 'RM',
        medicalHistory: 'Diabete tipo 2',
        medications: 'Metformina 500mg',
        isSmoker: true,
      },
    }),
    prisma.patient.create({
      data: {
        firstName: 'Luca',
        lastName: 'Verdi',
        email: 'luca.verdi@email.com',
        phone: '+39 333 3456789',
        dateOfBirth: new Date('1975-12-03'),
        fiscalCode: 'VRDLCU75T03L219Y',
        address: 'Piazza Garibaldi 7',
        city: 'Napoli',
        postalCode: '80100',
        province: 'NA',
        isSmoker: false,
      },
    }),
  ]);

  console.log(`✅ Creati ${patients.length} pazienti`);

  // Crea dispositivi UDI di esempio
  const udis = await Promise.all([
    prisma.udi.create({
      data: {
        udiCode: '(01)12345678901234(11)220315(17)250315(10)ABC123',
        deviceName: 'Impianto dentale in titanio',
        manufacturer: 'DentalTech Solutions',
        lotNumber: 'LOT2024001',
        serialNumber: 'SN123456789',
        expirationDate: new Date('2029-03-15'),
        description: 'Impianto dentale in titanio grado 4 per sostituzione singola',
      },
    }),
    prisma.udi.create({
      data: {
        udiCode: '(01)98765432109876(11)220415(17)250415(10)XYZ789',
        deviceName: 'Vite di guarigione',
        manufacturer: 'OralCare Devices',
        lotNumber: 'LOT2024002',
        serialNumber: 'SN987654321',
        expirationDate: new Date('2029-04-15'),
        description: 'Vite di guarigione per impianti dentali',
      },
    }),
  ]);

  console.log(`✅ Creati ${udis.length} dispositivi UDI`);

  // Crea appuntamenti di esempio
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        title: 'Visita di controllo',
        description: 'Controllo semestrale e pulizia dentale',
        startTime: new Date('2024-06-15T09:00:00Z'),
        endTime: new Date('2024-06-15T10:00:00Z'),
        status: 'scheduled',
        appointmentType: 'visita',
        priority: 'normal',
        patientId: patients[0].id,
        notes: 'Paziente riferisce sensibilità al freddo',
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Impianto dentale',
        description: 'Inserimento impianto molare superiore',
        startTime: new Date('2024-06-20T14:00:00Z'),
        endTime: new Date('2024-06-20T16:00:00Z'),
        status: 'confirmed',
        appointmentType: 'intervento',
        priority: 'high',
        patientId: patients[1].id,
        notes: 'Preparazione pre-operatoria completata',
      },
    }),
  ]);

  console.log(`✅ Creati ${appointments.length} appuntamenti`);

  // Crea fatture di esempio
  const invoices = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: '2024-0001',
        issueDate: new Date('2024-05-15'),
        dueDate: new Date('2024-06-15'),
        subtotal: 150.00,
        taxRate: 22.00,
        taxAmount: 33.00,
        total: 183.00,
        status: 'paid',
        paymentMethod: 'card',
        paymentDate: new Date('2024-05-20'),
        patientId: patients[0].id,
        description: 'Visita di controllo e pulizia dentale',
      },
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: '2024-0002',
        issueDate: new Date('2024-05-20'),
        dueDate: new Date('2024-06-20'),
        subtotal: 1200.00,
        taxRate: 22.00,
        taxAmount: 264.00,
        total: 1464.00,
        status: 'sent',
        patientId: patients[1].id,
        description: 'Impianto dentale molare superiore',
      },
    }),
  ]);

  console.log(`✅ Creati ${invoices.length} fatture`);

  // Crea relazioni Patient-UDI
  const patientUDIs = await Promise.all([
    prisma.patientUDI.create({
      data: {
        patientId: patients[1].id,
        udiId: udis[0].id,
        interventionDate: new Date('2024-05-25T14:00:00Z'),
        interventionType: 'chirurgico',
        teethInvolved: JSON.stringify(['16']), // Primo molare superiore destro
        notes: 'Impianto inserito con successo, nessuna complicazione',
      },
    }),
  ]);

  console.log(`✅ Creati ${patientUDIs.length} interventi con UDI`);

  // Crea notifiche di esempio
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: 'Appuntamento domani',
        message: 'Ricorda l\'appuntamento di controllo di domani alle 09:00',
        type: 'reminder',
        priority: 'normal',
        patientId: patients[0].id,
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Domani
      },
    }),
    prisma.notification.create({
      data: {
        title: 'Fattura in scadenza',
        message: 'La fattura 2024-0002 scade tra 5 giorni',
        type: 'payment',
        priority: 'high',
        patientId: patients[1].id,
        scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Tra 5 giorni
      },
    }),
  ]);

  console.log(`✅ Creati ${notifications.length} notifiche`);

  console.log('🎉 Seeding completato con successo!');
  console.log(`
📊 Riepilogo dati creati:
- ${patients.length} pazienti
- ${udis.length} dispositivi UDI
- ${appointments.length} appuntamenti
- ${invoices.length} fatture
- ${patientUDIs.length} interventi con UDI
- ${notifications.length} notifiche
  `);
}

main()
  .catch((e) => {
    console.error('❌ Errore durante il seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
