import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Tipi globali
export interface IPatient {
  id: number;
  name: string;
  // ...altri campi paziente
}

export interface IProduct {
  id: number;
  name: string;
  // ...altri campi prodotto
}

export interface ISession {
  userId: string;
  role: string;
  // ...altri campi sessione
}

// Slice: Pazienti
interface PatientStore {
  patients: IPatient[];
  addPatient: (patient: IPatient) => void;
  // ...altri metodi
}

const createPatientSlice = (set: any): PatientStore => ({
  patients: [],
  addPatient: (patient) => set((state: any) => ({ patients: [...state.patients, patient] })),
});

// Slice: Inventario
interface InventoryStore {
  inventory: IProduct[];
  addProduct: (product: IProduct) => void;
  // ...altri metodi
}

const createInventorySlice = (set: any): InventoryStore => ({
  inventory: [],
  addProduct: (product) => set((state: any) => ({ inventory: [...state.inventory, product] })),
});

// Slice: Sessione
interface SessionStore {
  session: ISession | null;
  setSession: (session: ISession) => void;
  clearSession: () => void;
}

const createSessionSlice = (set: any): SessionStore => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
});

// Store globale
export const useGlobalStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...createPatientSlice(set),
        ...createInventorySlice(set),
        ...createSessionSlice(set),
      }),
      { name: 'dental-crm' }
    )
  )
);
