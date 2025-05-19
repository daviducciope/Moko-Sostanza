import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Badge, Tabs, Tooltip } from 'flowbite-react';
import { Icon } from '@iconify/react';
import PatientEventList from '../../components/patients/PatientEventList';
import PatientEventModal from '../../components/patients/PatientEventModal';
import DentalProcedureList from '../../components/dental/DentalProcedureList';
import DentalProcedureModal from '../../components/dental/DentalProcedureModal';
import { usePatientEventStore, PatientEvent } from '../../services/PatientEventService';
import { useDentalProcedureStore, DentalProcedure } from '../../services/DentalProcedureService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Interfaccia per i dati del paziente
interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthdate: string;
  gender: string;
  address: string;
  notes: string;
  udiCode: string;
  lastVisit: string;
  nextAppointment: string;
  status: string;
  fiscalCode?: string;
  medicalHistory?: string;
  isSmoker?: boolean;
  medications?: string;
  anamnesis?: string;
}

// Componente per il template di stampa
const PrintTemplate = ({ patient, patientEvents, patientProcedures }: {
  patient: Patient,
  patientEvents: PatientEvent[],
  patientProcedures: DentalProcedure[]
}) => {
  // Formatta la data di nascita
  const formatBirthdate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Ottieni l'età del paziente
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div id="print-template" className="p-6 max-w-4xl mx-auto bg-white text-black print-content">
      {/* Intestazione */}
      <div className="text-center mb-6 page-header">
        <h1 className="text-2xl font-bold">Scheda Paziente</h1>
        <p className="text-sm text-gray-600">Generato il {new Date().toLocaleDateString('it-IT')}</p>
      </div>

      {/* Intestazione con dati principali */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-sm"><strong>Codice UDI:</strong> {patient.udiCode}</p>
            <p className="text-sm"><strong>Codice Fiscale:</strong> {patient.fiscalCode || 'Non specificato'}</p>
            <p className="text-sm"><strong>Stato:</strong> {patient.status}</p>
          </div>
          <div>
            <p className="text-sm"><strong>Ultima visita:</strong> {patient.lastVisit}</p>
            <p className="text-sm"><strong>Prossimo appuntamento:</strong> {patient.nextAppointment}</p>
          </div>
        </div>
      </div>

      {/* Informazioni personali */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Informazioni Personali</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
          <div>
            <p className="text-sm"><strong>Data di nascita:</strong> {formatBirthdate(patient.birthdate)} ({calculateAge(patient.birthdate)} anni)</p>
            <p className="text-sm"><strong>Genere:</strong> {patient.gender === 'M' ? 'Maschio' : patient.gender === 'F' ? 'Femmina' : 'Altro'}</p>
          </div>
          <div>
            <p className="text-sm"><strong>Telefono:</strong> {patient.phone}</p>
            <p className="text-sm"><strong>Email:</strong> {patient.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm"><strong>Indirizzo:</strong> {patient.address}</p>
            <p className="text-sm"><strong>Note:</strong> {patient.notes || 'Nessuna nota'}</p>
          </div>
        </div>
      </div>

      {/* Informazioni mediche */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Informazioni Mediche</h3>
        <div className="mt-2">
          <p className="text-sm mb-1"><strong>Fumatore:</strong> {patient.isSmoker ? 'Sì' : 'No'}</p>

          <p className="text-sm mt-3 mb-1"><strong>Patologie Pregresse:</strong></p>
          <p className="text-sm ml-3 mb-2">{patient.medicalHistory || 'Nessuna patologia pregressa registrata'}</p>

          <p className="text-sm mt-3 mb-1"><strong>Farmaci:</strong></p>
          <p className="text-sm ml-3 mb-2">{patient.medications || 'Nessun farmaco registrato'}</p>

          <p className="text-sm mt-3 mb-1"><strong>Anamnesi:</strong></p>
          <p className="text-sm ml-3 mb-2 whitespace-pre-wrap">{patient.anamnesis || 'Nessuna anamnesi registrata'}</p>
        </div>
      </div>

      {/* Interruzione di pagina prima degli interventi */}
      <div className="page-break"></div>

      {/* Interventi dentistici */}
      <div className="mb-6 mt-6">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Interventi Dentistici</h3>
        {patientProcedures.length > 0 ? (
          <div className="overflow-auto mt-2">
            <table className="w-full mt-4 border-collapse border">
              <thead>
                <tr>
                  <th className="border p-1">Data</th>
                  <th className="border p-1">Tipo</th>
                  <th className="border p-1">Denti coinvolti</th>
                  <th className="border p-1">Dettagli</th>
                </tr>
              </thead>
              <tbody>
                {patientProcedures.map((procedure) => (
                  <tr key={procedure.id}>
                    <td className="border p-1">{procedure.date}</td>
                    <td className="border p-1">{procedure.type === 'surgical' ? 'Chirurgico' : 'Non chirurgico'}</td>
                    <td className="border p-1">
                      {procedure.type === 'surgical' 
                        ? procedure.teethInvolved.join(', ') 
                        : '-'
                      }
                    </td>
                    <td className="border p-1">
                      {procedure.type === 'surgical' 
                        ? procedure.procedureType
                        : procedure.description
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm mt-2">Nessun intervento registrato</p>
        )}
      </div>

      {/* Eventi paziente */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Eventi e Documenti</h3>
        {patientEvents.length > 0 ? (
          <div className="overflow-auto mt-2">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-1 text-left" style={{ width: '15%' }}>Data</th>
                  <th className="border p-1 text-left" style={{ width: '15%' }}>Tipo</th>
                  <th className="border p-1 text-left" style={{ width: '20%' }}>Titolo</th>
                  <th className="border p-1 text-left" style={{ width: '50%' }}>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                {patientEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="border p-1">{event.date}</td>
                    <td className="border p-1">{event.type}</td>
                    <td className="border p-1">{event.title}</td>
                    <td className="border p-1">{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm mt-2">Nessun evento registrato</p>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 footer">
        <p>MOKO SOSTANZA Dental CRM - Gestionale per Dentisti</p>
        <p>Documento generato automaticamente - {new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </div>
  );
};

interface DentalProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  procedure?: DentalProcedure;
  patientId: number;
}

const ViewPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [activeTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPrintTemplate, setShowPrintTemplate] = useState(false);
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PatientEvent | undefined>(undefined);
  const [selectedProcedure, setSelectedProcedure] = useState<DentalProcedure | null>(null);
  
  const printTemplateRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  // Ottieni gli eventi del paziente dallo store
  const { getEventsByPatient, deleteEvent } = usePatientEventStore();
  const patientEvents = getEventsByPatient(Number(id));

  // Ottieni gli interventi dentistici del paziente dallo store
  const { getProceduresByPatient, deleteProcedure } = useDentalProcedureStore();
  const patientProcedures = getProceduresByPatient(Number(id));

  // Simula il caricamento dei dati del paziente
  useEffect(() => {
    // In un'applicazione reale, qui ci sarebbe una chiamata API
    // per ottenere i dati del paziente con l'ID specificato
    setTimeout(() => {
      // Dati di esempio
      const mockPatient: Patient = {
        id: Number(id),
        name: "Mario Rossi",
        phone: "+39 333 1234567",
        email: "mario.rossi@example.com",
        birthdate: "1980-05-15",
        gender: "M",
        address: "Via Roma 123, Milano",
        notes: "Paziente con allergia al lattice. Preferisce appuntamenti mattutini.",
        udiCode: "IT-12345678",
        lastVisit: "15/05/2023",
        nextAppointment: "22/06/2023",
        status: "Attivo",
        fiscalCode: "RSSMRA80E15F205X",
        medicalHistory: "Ipertensione, Diabete di tipo 2",
        isSmoker: true,
        medications: "Metformina 500mg (1 compressa a colazione), Ramipril 5mg (1 compressa a cena)",
        anamnesis: "Il paziente riferisce familiarità per patologie cardiovascolari. Padre deceduto per infarto miocardico a 65 anni. Madre in vita, 75 anni, affetta da ipertensione arteriosa. Non riferisce allergie a farmaci. Riferisce episodi di cefalea occasionale."
      };

      setPatient(mockPatient);
      setLoading(false);
    }, 500);
  }, [id]);

  // Funzione per stampare il profilo del paziente
  const handlePrintProfile = () => {
    setShowPrintTemplate(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintTemplate(false);
      }, 500);
    }, 300);
  };

  // Funzione per generare e scaricare il PDF
  const handleDownloadPDF = async () => {
    if (!patient) {
      console.error('Nessun paziente disponibile per generare il PDF');
      return;
    }

    // Mostra l'indicatore di caricamento
    setIsGeneratingPDF(true);

    // Utilizziamo un approccio più semplice e diretto per la generazione del PDF
    try {
      // Assicuriamoci che il template PDF sia visibile
      if (!pdfTemplateRef.current) {
        console.error('Riferimento al template PDF non disponibile');
        setIsGeneratingPDF(false);
        return;
      }

      // Utilizziamo una versione semplificata di html2canvas + jsPDF
      const element = pdfTemplateRef.current;

      // Creiamo il canvas dall'elemento HTML
      const canvas = await html2canvas(element, {
        scale: 2, // Alta qualità
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Creiamo il documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Dimensioni A4 in mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Margini
      const margin = 10;

      // Dimensioni effettive dell'area di stampa
      const printWidth = pageWidth - (margin * 2);

      // Calcola le dimensioni dell'immagine nel PDF
      const imgWidth = printWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Aggiungiamo l'immagine al PDF
      // Utilizziamo un metodo più semplice per la suddivisione in pagine

      // Altezza massima per pagina
      const maxHeight = pageHeight - (margin * 2);

      // Numero di pagine necessarie
      const pageCount = Math.ceil(imgHeight / maxHeight);

      // Per ogni pagina
      for (let i = 0; i < pageCount; i++) {
        // Se non è la prima pagina, aggiungi una nuova pagina
        if (i > 0) {
          pdf.addPage();
        }

        // Calcola la posizione di inizio nel canvas
        const sourceY = (i * maxHeight / imgHeight) * canvas.height;

        // Calcola l'altezza della porzione da includere
        const sourceHeight = Math.min(
          canvas.height - sourceY,
          (maxHeight / imgHeight) * canvas.height
        );

        // Crea un canvas temporaneo per la porzione corrente
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = sourceHeight;

        // Disegna la porzione corrente sul canvas temporaneo
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, tempCanvas.width, tempCanvas.height
          );

          // Converti il canvas temporaneo in immagine
          const imgData = tempCanvas.toDataURL('image/jpeg', 1.0);

          // Aggiungi l'immagine al PDF
          pdf.addImage(
            imgData,
            'JPEG',
            margin,
            margin,
            printWidth,
            (sourceHeight * printWidth) / canvas.width
          );
        }
      }

      // Aggiungi metadati al PDF
      pdf.setProperties({
        title: `Scheda Paziente - ${patient.name}`,
        subject: 'Scheda Paziente',
        author: 'MOKO SOSTANZA Dental CRM',
        keywords: 'paziente, dentista, scheda',
        creator: 'MOKO SOSTANZA Dental CRM'
      });

      // Genera il nome del file
      const fileName = `Paziente_${patient.name.replace(/\s+/g, '_')}.pdf`;

      // Scarica il PDF
      pdf.save(fileName);

    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
      // Qui potremmo mostrare un messaggio di errore all'utente
    } finally {
      // Nascondi l'indicatore di caricamento
      setIsGeneratingPDF(false);
    }
  };

  // Funzione per aprire il modale di creazione evento
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  // Funzione per aprire il modale di modifica evento
  const handleEditEvent = (event: PatientEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  // Funzione per chiudere il modale
  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  // Funzione per eliminare un evento
  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Sei sicuro di voler eliminare questo evento? Questa azione non può essere annullata.')) {
      deleteEvent(eventId);
    }
  };

  // Funzione per aprire il modale di creazione intervento
  const handleAddProcedure = () => {
    setSelectedProcedure(null);
    setIsProcedureModalOpen(true);
  };

  // Funzione per aprire il modale di modifica intervento
  const handleEditProcedure = (procedure: DentalProcedure) => {
    setSelectedProcedure(procedure);
    setIsProcedureModalOpen(true);
  };

  // Funzione per chiudere il modale degli interventi
  const handleCloseProcedureModal = () => {
    setIsProcedureModalOpen(false);
    setSelectedProcedure(null);
  };

  // Funzione per eliminare un intervento
  const handleDeleteProcedure = (procedureId: number) => {
    const { deleteProcedure } = useDentalProcedureStore.getState();
    deleteProcedure(procedureId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center p-6">
        <h5 className="text-xl font-bold mb-2">Paziente non trovato</h5>
        <p className="mb-4">Il paziente richiesto non è stato trovato nel sistema.</p>
        <Button color="primary" as={Link} to="/patients">
          Torna alla lista pazienti
        </Button>
      </div>
    );
  }

  // Formatta la data di nascita
  const formatBirthdate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Ottieni l'età del paziente
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      {/* Top action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Dettagli Paziente</h5>
          <Link to="/patients" className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna alla lista pazienti</span>
          </Link>
        </div>
        <div className="button-group w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <Button 
            color="light" 
            onClick={handlePrintProfile} 
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Icon icon="solar:printer-outline" height={20} />
            <span className="whitespace-nowrap">Stampa Profilo</span>
          </Button>
          <Button
            color="light"
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                <span className="whitespace-nowrap">Generazione PDF...</span>
              </>
            ) : (
              <>
                <Icon icon="solar:file-download-outline" height={20} />
                <span className="whitespace-nowrap">Scarica PDF</span>
              </>
            )}
          </Button>
          <Button 
            color="primary" 
            as={Link} 
            to={`/patients/edit/${patient?.id}`} 
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Icon icon="solar:pen-outline" height={20} />
            <span className="whitespace-nowrap">Modifica</span>
          </Button>
        </div>
      </div>

      {/* Tabs con le sezioni */}
      <Tabs aria-label="Informazioni paziente">
        <Tabs.Item 
          active={activeTab === 0} 
          title="Informazioni" 
          icon={() => <Icon icon="solar:user-outline" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Informazioni principali */}
            <Card className="col-span-1">
              <div className="flex flex-col pb-4">
                <h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                  {patient.name}
                </h5>
                <div className="flex mb-4">
                  <Badge className={patient.status === "Attivo" ? "bg-lightsuccess text-success" : "bg-lighterror text-error"}>
                    {patient.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Codice UDI: <span className="font-medium">{patient.udiCode}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Codice Fiscale: <span className="font-medium">{patient.fiscalCode || 'Non specificato'}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Ultima visita: <span className="font-medium">{patient.lastVisit}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Prossimo appuntamento: <span className="font-medium">{patient.nextAppointment}</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Dettagli personali */}
            <Card className="col-span-2">
              <h5 className="text-lg font-bold mb-4">Informazioni Personali</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data di nascita</p>
                  <p className="font-medium">{formatBirthdate(patient.birthdate)} ({calculateAge(patient.birthdate)} anni)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Genere</p>
                  <p className="font-medium">
                    {patient.gender === 'M' ? 'Maschio' : patient.gender === 'F' ? 'Femmina' : 'Altro'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Telefono</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Indirizzo</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Note</p>
                  <p className="font-medium">{patient.notes || 'Nessuna nota'}</p>
                </div>
              </div>
            </Card>
          </div>
        </Tabs.Item>

        <Tabs.Item 
          active={activeTab === 1} 
          title="Eventi e Documenti" 
          icon={() => <Icon icon="solar:document-text-outline" />}
        >
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h5 className="text-lg font-bold">Eventi Paziente</h5>
              <Button 
                color="primary" 
                size="sm" 
                onClick={handleAddEvent} 
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Icon icon="solar:add-circle-outline" height={20} />
                <span className="whitespace-nowrap">Nuovo Evento</span>
              </Button>
            </div>

            <PatientEventList
              events={patientEvents}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </Tabs.Item>

        <Tabs.Item 
          active={activeTab === 2} 
          title="Cartella Clinica" 
          icon={() => <Icon icon="solar:medicine-outline" />}
        >
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h5 className="text-lg font-bold">Interventi Dentistici</h5>
              <Button 
                color="primary" 
                size="sm" 
                onClick={handleAddProcedure} 
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Icon icon="solar:add-circle-outline" height={20} />
                <span className="whitespace-nowrap">Nuovo Intervento</span>
              </Button>
            </div>

            <DentalProcedureList
              patientId={Number(id)}
              onEditProcedure={handleEditProcedure}
              onNewProcedure={handleAddProcedure}
              onDeleteProcedure={handleDeleteProcedure}
            />
          </div>
        </Tabs.Item>
      </Tabs>

      {/* Modale per la creazione/modifica degli eventi */}
      <PatientEventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        event={selectedEvent}
        patientId={Number(id)}
      />

      {/* Modale per la creazione/modifica degli interventi */}
      <DentalProcedureModal
        isOpen={isProcedureModalOpen}
        onClose={handleCloseProcedureModal}
        procedure={selectedProcedure || undefined}
        patientId={Number(id)}
      />

      {/* Template di stampa (nascosto normalmente, visibile solo durante la stampa) */}
      {showPrintTemplate && (
        <div className="fixed top-0 left-0 w-full h-0 overflow-hidden print:h-auto print:overflow-visible">
          <div ref={printTemplateRef} className="bg-white">
            <PrintTemplate
              patient={patient}
              patientEvents={patientEvents}
              patientProcedures={patientProcedures}
            />
          </div>
        </div>
      )}

      {/* Template di stampa nascosto ma renderizzato per la generazione PDF */}
      <div className="fixed top-0 left-0 w-full opacity-0 pointer-events-none" style={{ zIndex: -9999 }}>
        <div id="pdf-template" ref={pdfTemplateRef} className="bg-white p-0 m-0">
          {patient && (
            <PrintTemplate
              patient={patient}
              patientEvents={patientEvents}
              patientProcedures={patientProcedures}
            />
          )}
        </div>
      </div>

      {/* Stili per la stampa */}
      <style type="text/css" media="print">
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-template, #print-template * {
              visibility: visible;
            }
            #print-template {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              font-size: 12pt;
              line-height: 1.3;
            }
            .page-break {
              page-break-before: always;
              margin-top: 0;
              padding-top: 0;
            }
            .page-header {
              position: running(header);
            }
            .footer {
              position: running(footer);
            }
            table {
              page-break-inside: avoid;
              font-size: 10pt;
            }
            table tr {
              page-break-inside: avoid;
            }
            p {
              orphans: 3;
              widows: 3;
            }
            h1, h2, h3, h4 {
              page-break-after: avoid;
            }
            @page {
              size: A4;
              margin: 15mm;
              @top-center {
                content: element(header);
              }
              @bottom-center {
                content: element(footer);
              }
            }
            .print-content {
              padding: 0;
              max-width: 100%;
            }
            .whitespace-pre-wrap {
              white-space: pre-wrap;
              word-break: break-word;
            }
            td, th {
              max-width: 100%;
              overflow-wrap: break-word;
              word-wrap: break-word;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewPatient;
