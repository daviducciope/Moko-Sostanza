import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definizione dell'interfaccia Reminder
export interface Reminder {
  id: number;
  date: string; // formato YYYY-MM-DD
  time: string; // formato HH:MM
  title: string;
  text: string;
  completed: boolean;
}

// Funzione per generare dati di esempio
const generateSampleReminders = (count: number): Reminder[] => {
  const reminders: Reminder[] = [];
  const today = new Date();
  
  // Genera date casuali nei prossimi 30 giorni
  const generateRandomDate = () => {
    const randomDays = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() + randomDays);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  // Genera orari casuali
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };
  
  const titles = [
    "Chiamare paziente",
    "Ordinare materiali",
    "Riunione staff",
    "Controllo fatture",
    "Aggiornamento software",
    "Manutenzione attrezzature",
    "Formazione personale"
  ];
  
  const texts = [
    "Contattare il paziente per confermare l'appuntamento",
    "Ordinare nuovi materiali per il laboratorio",
    "Riunione settimanale con lo staff",
    "Controllare le fatture in scadenza",
    "Aggiornare il software gestionale",
    "Programmare la manutenzione delle attrezzature",
    "Organizzare sessione di formazione per il personale"
  ];
  
  for (let i = 1; i <= count; i++) {
    const titleIndex = Math.floor(Math.random() * titles.length);
    
    reminders.push({
      id: i,
      date: generateRandomDate(),
      time: generateRandomTime(),
      title: titles[titleIndex],
      text: texts[titleIndex],
      completed: Math.random() > 0.7 // 30% di probabilità che sia completato
    });
  }
  
  return reminders;
};

// Genera 10 promemoria di esempio
const sampleReminders = generateSampleReminders(10);

// Definizione dell'interfaccia dello store
interface ReminderStore {
  reminders: Reminder[];
  
  // Azioni
  addReminder: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
  updateReminder: (id: number, reminder: Partial<Reminder>) => void;
  deleteReminder: (id: number) => void;
  toggleCompleted: (id: number) => void;
  
  // Getter
  getRemindersByDate: (date: string) => Reminder[];
  getReminderById: (id: number) => Reminder | undefined;
  getUpcomingReminders: (count?: number) => Reminder[];
}

// Creazione dello store
export const useReminderStore = create<ReminderStore>()(
  persist(
    (set, get) => ({
      reminders: sampleReminders,
      
      // Azioni
      addReminder: (reminder) => set((state) => ({
        reminders: [
          ...state.reminders, 
          { 
            ...reminder, 
            id: Math.max(0, ...state.reminders.map(r => r.id)) + 1,
            completed: false
          }
        ]
      })),
      
      updateReminder: (id, reminder) => set((state) => ({
        reminders: state.reminders.map(r => 
          r.id === id ? { ...r, ...reminder } : r
        )
      })),
      
      deleteReminder: (id) => set((state) => ({
        reminders: state.reminders.filter(r => r.id !== id)
      })),
      
      toggleCompleted: (id) => set((state) => ({
        reminders: state.reminders.map(r => 
          r.id === id ? { ...r, completed: !r.completed } : r
        )
      })),
      
      // Getter
      getRemindersByDate: (date) => 
        get().reminders.filter(r => r.date === date),
      
      getReminderById: (id) => 
        get().reminders.find(r => r.id === id),
      
      getUpcomingReminders: (count = 5) => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        
        return get().reminders
          .filter(r => r.date >= formattedToday && !r.completed)
          .sort((a, b) => {
            // Ordina per data e ora
            if (a.date !== b.date) {
              return a.date.localeCompare(b.date);
            }
            return a.time.localeCompare(b.time);
          })
          .slice(0, count);
      }
    }),
    {
      name: 'dental-reminders-storage',
    }
  )
);

// Funzioni di utilità
export const formatReminderDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return dateObj.toLocaleDateString('it-IT', options);
};

export const isToday = (date: string): boolean => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  return date === todayFormatted;
};

export const isTomorrow = (date: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  return date === tomorrowFormatted;
};

export const getRelativeDate = (date: string): string => {
  if (isToday(date)) return 'Oggi';
  if (isTomorrow(date)) return 'Domani';
  return formatReminderDate(date);
};
