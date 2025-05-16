import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definizione delle interfacce
export interface PatientEvent {
  id: number;
  patientId: number;
  date: string; // formato YYYY-MM-DD
  time: string; // formato HH:MM
  type: 'visita' | 'prescrizione' | 'analisi' | 'nota' | 'altro';
  title: string;
  description: string;
  attachments: Attachment[];
  createdBy: string; // nome del medico o operatore
}

export interface Attachment {
  id: number;
  name: string;
  type: string; // tipo MIME
  size: number; // dimensione in bytes
  url: string; // URL del file (in un'app reale sarebbe un percorso o un ID di storage)
  uploadDate: string; // data di caricamento
}

// Genera dati di esempio
const generateSampleEvents = (count: number = 10): PatientEvent[] => {
  const events: PatientEvent[] = [];
  
  const types: PatientEvent['type'][] = ['visita', 'prescrizione', 'analisi', 'nota', 'altro'];
  const titles = [
    "Visita di controllo",
    "Prescrizione antibiotico",
    "Analisi del sangue",
    "Radiografia panoramica",
    "Pulizia dentale",
    "Controllo apparecchio",
    "Estrazione dente",
    "Impianto dentale"
  ];
  
  const descriptions = [
    "Controllo di routine. Nessun problema rilevato.",
    "Prescritto antibiotico per infezione gengivale.",
    "Richiesta analisi del sangue per valutare infiammazione.",
    "Effettuata radiografia panoramica per valutare stato generale.",
    "Effettuata pulizia dentale professionale.",
    "Controllo e regolazione dell'apparecchio ortodontico.",
    "Estrazione del dente del giudizio inferiore destro.",
    "Prima fase dell'impianto dentale nell'arcata superiore."
  ];
  
  const doctors = [
    "Dr. Bianchi",
    "Dr. Rossi",
    "Dr. Verdi",
    "Dr.ssa Neri"
  ];
  
  // Genera date casuali negli ultimi 6 mesi
  const generateRandomDate = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    const randomDate = new Date(
      sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime())
    );
    
    return randomDate.toISOString().split('T')[0];
  };
  
  // Genera orari casuali
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 9) + 9; // 9-18
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };
  
  // Genera allegati casuali
  const generateRandomAttachments = (): Attachment[] => {
    const attachments: Attachment[] = [];
    const shouldHaveAttachments = Math.random() > 0.5;
    
    if (shouldHaveAttachments) {
      const numAttachments = Math.floor(Math.random() * 3) + 1; // 1-3 allegati
      
      const fileTypes = [
        { type: 'application/pdf', ext: 'pdf' },
        { type: 'image/jpeg', ext: 'jpg' },
        { type: 'image/png', ext: 'png' },
        { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' }
      ];
      
      const fileNames = [
        "Radiografia",
        "Analisi",
        "Prescrizione",
        "Referto",
        "Documento"
      ];
      
      for (let i = 0; i < numAttachments; i++) {
        const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
        const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
        const size = Math.floor(Math.random() * 5000000) + 100000; // 100KB - 5MB
        
        attachments.push({
          id: i + 1,
          name: `${fileName}_${Math.floor(Math.random() * 1000)}.${fileType.ext}`,
          type: fileType.type,
          size: size,
          url: `#`, // In un'app reale, questo sarebbe un URL o un percorso
          uploadDate: generateRandomDate()
        });
      }
    }
    
    return attachments;
  };
  
  // Genera eventi casuali
  for (let i = 1; i <= count; i++) {
    const typeIndex = Math.floor(Math.random() * types.length);
    const titleIndex = Math.floor(Math.random() * titles.length);
    const patientId = Math.floor(Math.random() * 5) + 1; // 5 pazienti di esempio
    
    events.push({
      id: i,
      patientId: patientId,
      date: generateRandomDate(),
      time: generateRandomTime(),
      type: types[typeIndex],
      title: titles[titleIndex],
      description: descriptions[titleIndex],
      attachments: generateRandomAttachments(),
      createdBy: doctors[Math.floor(Math.random() * doctors.length)]
    });
  }
  
  return events;
};

// Genera 20 eventi di esempio
const sampleEvents = generateSampleEvents(20);

// Definizione dell'interfaccia dello store
interface PatientEventStore {
  events: PatientEvent[];
  
  // Azioni
  addEvent: (event: Omit<PatientEvent, 'id'>) => void;
  updateEvent: (id: number, event: Partial<PatientEvent>) => void;
  deleteEvent: (id: number) => void;
  addAttachment: (eventId: number, attachment: Omit<Attachment, 'id'>) => void;
  deleteAttachment: (eventId: number, attachmentId: number) => void;
  
  // Getter
  getEventsByPatient: (patientId: number) => PatientEvent[];
  getEventById: (id: number) => PatientEvent | undefined;
  getRecentEvents: (count?: number) => PatientEvent[];
}

// Creazione dello store
export const usePatientEventStore = create<PatientEventStore>()(
  persist(
    (set, get) => ({
      events: sampleEvents,
      
      // Azioni
      addEvent: (event) => set((state) => ({
        events: [
          ...state.events, 
          { 
            ...event, 
            id: Math.max(0, ...state.events.map(e => e.id)) + 1
          }
        ]
      })),
      
      updateEvent: (id, event) => set((state) => ({
        events: state.events.map(e => 
          e.id === id ? { ...e, ...event } : e
        )
      })),
      
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),
      
      addAttachment: (eventId, attachment) => set((state) => ({
        events: state.events.map(e => {
          if (e.id === eventId) {
            const newAttachment = {
              ...attachment,
              id: Math.max(0, ...e.attachments.map(a => a.id)) + 1
            };
            return {
              ...e,
              attachments: [...e.attachments, newAttachment]
            };
          }
          return e;
        })
      })),
      
      deleteAttachment: (eventId, attachmentId) => set((state) => ({
        events: state.events.map(e => {
          if (e.id === eventId) {
            return {
              ...e,
              attachments: e.attachments.filter(a => a.id !== attachmentId)
            };
          }
          return e;
        })
      })),
      
      // Getter
      getEventsByPatient: (patientId) => 
        get().events.filter(e => e.patientId === patientId)
          .sort((a, b) => {
            // Ordina per data e ora (più recenti prima)
            if (a.date !== b.date) {
              return b.date.localeCompare(a.date);
            }
            return b.time.localeCompare(a.time);
          }),
      
      getEventById: (id) => 
        get().events.find(e => e.id === id),
      
      getRecentEvents: (count = 5) => {
        return get().events
          .sort((a, b) => {
            // Ordina per data e ora (più recenti prima)
            if (a.date !== b.date) {
              return b.date.localeCompare(a.date);
            }
            return b.time.localeCompare(a.time);
          })
          .slice(0, count);
      }
    }),
    {
      name: 'dental-patient-events-storage',
    }
  )
);

// Funzioni di utilità
export const formatEventDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

export const formatEventDateTime = (date: string, time: string): string => {
  return `${formatEventDate(date)} ${time}`;
};

export const getEventTypeIcon = (type: PatientEvent['type']): string => {
  switch (type) {
    case 'visita':
      return 'solar:stethoscope-outline';
    case 'prescrizione':
      return 'solar:document-medicine-outline';
    case 'analisi':
      return 'solar:test-tube-outline';
    case 'nota':
      return 'solar:notes-outline';
    case 'altro':
    default:
      return 'solar:document-outline';
  }
};

export const getEventTypeLabel = (type: PatientEvent['type']): string => {
  switch (type) {
    case 'visita':
      return 'Visita';
    case 'prescrizione':
      return 'Prescrizione';
    case 'analisi':
      return 'Analisi';
    case 'nota':
      return 'Nota';
    case 'altro':
    default:
      return 'Altro';
  }
};

export const getEventTypeColor = (type: PatientEvent['type']): string => {
  switch (type) {
    case 'visita':
      return 'bg-lightprimary text-primary';
    case 'prescrizione':
      return 'bg-lightsuccess text-success';
    case 'analisi':
      return 'bg-lightwarning text-warning';
    case 'nota':
      return 'bg-lightinfo text-info';
    case 'altro':
    default:
      return 'bg-lightgray text-gray-500';
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
};
