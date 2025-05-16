import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definizione delle interfacce
export type ProcedureType = 'surgical' | 'non-surgical';

// Interfaccia per i denti
export interface Tooth {
  id: number;
  name: string;
  position: string; // "upper-left", "upper-right", "lower-left", "lower-right"
  number: number; // Numerazione internazionale FDI
}

// Interfaccia base per gli interventi dentistici
export interface BaseDentalProcedure {
  id: number;
  patientId: number;
  date: string; // formato YYYY-MM-DD
  type: ProcedureType;
  createdBy: string; // nome del medico o operatore
  createdAt: string; // data di creazione del record
}

// Interfaccia per gli interventi chirurgici
export interface SurgicalProcedure extends BaseDentalProcedure {
  type: 'surgical';
  procedureType: string; // tipo specifico di intervento chirurgico
  teethInvolved: number[]; // array di ID dei denti coinvolti
  medicalDevices: MedicalDevice[]; // dispositivi medici utilizzati
}

// Interfaccia per gli interventi non chirurgici
export interface NonSurgicalProcedure extends BaseDentalProcedure {
  type: 'non-surgical';
  description: string; // descrizione dell'intervento
}

// Unione dei tipi di intervento
export type DentalProcedure = SurgicalProcedure | NonSurgicalProcedure;

// Interfaccia per i dispositivi medici
export interface MedicalDevice {
  id: number;
  name: string; // nome/tipo del prodotto
  useDate: string; // data di utilizzo
  udiCode: string; // codice UDI (Unique Device Identification)
}

// Definizione dei denti secondo la numerazione internazionale FDI
export const teethData: Tooth[] = [
  // Arcata superiore destra (dal punto di vista del paziente)
  { id: 18, name: "Terzo molare", position: "upper-right", number: 18 },
  { id: 17, name: "Secondo molare", position: "upper-right", number: 17 },
  { id: 16, name: "Primo molare", position: "upper-right", number: 16 },
  { id: 15, name: "Secondo premolare", position: "upper-right", number: 15 },
  { id: 14, name: "Primo premolare", position: "upper-right", number: 14 },
  { id: 13, name: "Canino", position: "upper-right", number: 13 },
  { id: 12, name: "Incisivo laterale", position: "upper-right", number: 12 },
  { id: 11, name: "Incisivo centrale", position: "upper-right", number: 11 },
  
  // Arcata superiore sinistra (dal punto di vista del paziente)
  { id: 21, name: "Incisivo centrale", position: "upper-left", number: 21 },
  { id: 22, name: "Incisivo laterale", position: "upper-left", number: 22 },
  { id: 23, name: "Canino", position: "upper-left", number: 23 },
  { id: 24, name: "Primo premolare", position: "upper-left", number: 24 },
  { id: 25, name: "Secondo premolare", position: "upper-left", number: 25 },
  { id: 26, name: "Primo molare", position: "upper-left", number: 26 },
  { id: 27, name: "Secondo molare", position: "upper-left", number: 27 },
  { id: 28, name: "Terzo molare", position: "upper-left", number: 28 },
  
  // Arcata inferiore sinistra (dal punto di vista del paziente)
  { id: 38, name: "Terzo molare", position: "lower-left", number: 38 },
  { id: 37, name: "Secondo molare", position: "lower-left", number: 37 },
  { id: 36, name: "Primo molare", position: "lower-left", number: 36 },
  { id: 35, name: "Secondo premolare", position: "lower-left", number: 35 },
  { id: 34, name: "Primo premolare", position: "lower-left", number: 34 },
  { id: 33, name: "Canino", position: "lower-left", number: 33 },
  { id: 32, name: "Incisivo laterale", position: "lower-left", number: 32 },
  { id: 31, name: "Incisivo centrale", position: "lower-left", number: 31 },
  
  // Arcata inferiore destra (dal punto di vista del paziente)
  { id: 41, name: "Incisivo centrale", position: "lower-right", number: 41 },
  { id: 42, name: "Incisivo laterale", position: "lower-right", number: 42 },
  { id: 43, name: "Canino", position: "lower-right", number: 43 },
  { id: 44, name: "Primo premolare", position: "lower-right", number: 44 },
  { id: 45, name: "Secondo premolare", position: "lower-right", number: 45 },
  { id: 46, name: "Primo molare", position: "lower-right", number: 46 },
  { id: 47, name: "Secondo molare", position: "lower-right", number: 47 },
  { id: 48, name: "Terzo molare", position: "lower-right", number: 48 },
];

// Genera dati di esempio per gli interventi
const generateSampleProcedures = (): DentalProcedure[] => {
  const procedures: DentalProcedure[] = [];
  
  // Esempio di intervento chirurgico
  const surgicalProcedure: SurgicalProcedure = {
    id: 1,
    patientId: 1,
    date: "2023-11-15",
    type: "surgical",
    procedureType: "Estrazione dentale",
    teethInvolved: [18, 28], // Terzi molari superiori
    medicalDevices: [
      {
        id: 1,
        name: "Pinza chirurgica",
        useDate: "2023-11-15",
        udiCode: "UDI-DI-123456789"
      },
      {
        id: 2,
        name: "Suture riassorbibili",
        useDate: "2023-11-15",
        udiCode: "UDI-DI-987654321"
      }
    ],
    createdBy: "Dr. Bianchi",
    createdAt: "2023-11-15T10:30:00"
  };
  
  // Esempio di intervento non chirurgico
  const nonSurgicalProcedure: NonSurgicalProcedure = {
    id: 2,
    patientId: 1,
    date: "2023-11-20",
    type: "non-surgical",
    description: "Pulizia dentale professionale con rimozione di tartaro e placca. Applicazione di fluoro.",
    createdBy: "Dr.ssa Rossi",
    createdAt: "2023-11-20T14:45:00"
  };
  
  procedures.push(surgicalProcedure, nonSurgicalProcedure);
  
  return procedures;
};

// Dati di esempio
const sampleProcedures = generateSampleProcedures();

// Definizione dell'interfaccia dello store
interface DentalProcedureStore {
  procedures: DentalProcedure[];
  
  // Azioni
  addProcedure: (procedure: Omit<DentalProcedure, 'id' | 'createdAt'>) => void;
  updateProcedure: (id: number, procedure: Partial<DentalProcedure>) => void;
  deleteProcedure: (id: number) => void;
  
  // Getter
  getProceduresByPatient: (patientId: number) => DentalProcedure[];
  getProcedureById: (id: number) => DentalProcedure | undefined;
  getTeethById: (ids: number[]) => Tooth[];
  getAllTeeth: () => Tooth[];
}

// Creazione dello store
export const useDentalProcedureStore = create<DentalProcedureStore>()(
  persist(
    (set, get) => ({
      procedures: sampleProcedures,
      
      // Azioni
      addProcedure: (procedure) => set((state) => {
        const now = new Date().toISOString();
        return {
          procedures: [
            ...state.procedures,
            {
              ...procedure,
              id: Math.max(0, ...state.procedures.map(p => p.id)) + 1,
              createdAt: now
            } as DentalProcedure
          ]
        };
      }),
      
      updateProcedure: (id, procedure) => set((state) => ({
        procedures: state.procedures.map(p => 
          p.id === id ? { ...p, ...procedure } : p
        )
      })),
      
      deleteProcedure: (id) => set((state) => ({
        procedures: state.procedures.filter(p => p.id !== id)
      })),
      
      // Getter
      getProceduresByPatient: (patientId) => 
        get().procedures.filter(p => p.patientId === patientId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      
      getProcedureById: (id) => 
        get().procedures.find(p => p.id === id),
      
      getTeethById: (ids) => 
        teethData.filter(tooth => ids.includes(tooth.id)),
      
      getAllTeeth: () => teethData
    }),
    {
      name: 'dental-procedures-storage',
    }
  )
);

// Funzioni di utilità
export const formatProcedureDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

export const getToothName = (toothId: number): string => {
  const tooth = teethData.find(t => t.id === toothId);
  return tooth ? `${tooth.number} - ${tooth.name}` : `Dente ${toothId}`;
};

export const validateUDICode = (udiCode: string): boolean => {
  // Implementazione semplificata della validazione del codice UDI
  // In un'applicazione reale, questa dovrebbe seguire le specifiche precise per i codici UDI
  return /^UDI-DI-\d{9}$/.test(udiCode);
};
