import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Card, Badge, Tabs } from 'flowbite-react';
import { Icon } from '@iconify/react';
import PatientEventList from '../../components/patients/PatientEventList';
import PatientEventModal from '../../components/patients/PatientEventModal';
import DentalProcedureList from '../../components/dental/DentalProcedureList';
import DentalProcedureModal from '../../components/dental/DentalProcedureModal';
import { usePatientEventStore, PatientEvent } from '../../services/PatientEventService';
import { useDentalProcedureStore, DentalProcedure } from '../../services/DentalProcedureService';

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

const ViewPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PatientEvent | undefined>(undefined);
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<DentalProcedure | undefined>(undefined);

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
    window.print();
  };

  // Funzione per aprire il modale di creazione evento
  const handleAddEvent = () => {
    setSelectedEvent(undefined);
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
    setSelectedEvent(undefined);
  };

  // Funzione per eliminare un evento
  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Sei sicuro di voler eliminare questo evento? Questa azione non può essere annullata.')) {
      deleteEvent(eventId);
    }
  };

  // Funzione per aprire il modale di creazione intervento
  const handleAddProcedure = () => {
    setSelectedProcedure(undefined);
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
    setSelectedProcedure(undefined);
  };

  // Funzione per eliminare un intervento
  const handleDeleteProcedure = (procedureId: number) => {
    if (confirm('Sei sicuro di voler eliminare questo intervento? Questa azione non può essere annullata.')) {
      deleteProcedure(procedureId);
    }
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Profilo Paziente</h5>
          <Link to="/patients" className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna alla lista pazienti</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button color="light" onClick={handlePrintProfile} className="flex items-center gap-2">
            <Icon icon="solar:printer-outline" height={20} />
            Stampa Profilo
          </Button>
          <Button color="primary" as={Link} to={`/patients/edit/${patient.id}`} className="flex items-center gap-2">
            <Icon icon="solar:pen-outline" height={20} />
            Modifica
          </Button>
        </div>
      </div>

      {/* Schede informazioni e eventi */}
      <Tabs aria-label="Informazioni paziente" style={{base: "underline"}} onActiveTabChange={setActiveTab}>
        <Tabs.Item active={activeTab === 0} title="Informazioni" icon={() => <Icon icon="solar:user-outline" />} iconPosition="left" className="gap-2">
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

        <Tabs.Item active={activeTab === 1} title="Cartella Clinica" icon={() => <Icon icon="solar:stethoscope-outline" />} iconPosition="left" className="gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Informazioni mediche */}
            <Card>
              <h5 className="text-lg font-bold mb-4">Informazioni Mediche</h5>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fumatore</p>
                  <div className="flex items-center mt-1">
                    <Badge className={patient.isSmoker ? "bg-lighterror text-error" : "bg-lightsuccess text-success"}>
                      {patient.isSmoker ? 'Sì' : 'No'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patologie Pregresse</p>
                  <p className="font-medium whitespace-pre-line">
                    {patient.medicalHistory || 'Nessuna patologia pregressa registrata'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Farmaci</p>
                  <p className="font-medium whitespace-pre-line">
                    {patient.medications || 'Nessun farmaco registrato'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Anamnesi */}
            <Card>
              <h5 className="text-lg font-bold mb-4">Anamnesi</h5>
              <p className="whitespace-pre-line">
                {patient.anamnesis || 'Nessuna anamnesi registrata'}
              </p>
            </Card>
          </div>
        </Tabs.Item>

        <Tabs.Item active={activeTab === 2} title="Interventi" icon={() => <Icon icon="solar:tooth-outline" />} iconPosition="left" className="gap-2">
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-bold">Interventi Dentistici</h5>
              <Button color="primary" size="sm" onClick={handleAddProcedure} className="flex items-center gap-2">
                <Icon icon="solar:add-circle-outline" height={20} />
                Nuovo Intervento
              </Button>
            </div>

            <DentalProcedureList
              procedures={patientProcedures}
              onEditProcedure={handleEditProcedure}
              onDeleteProcedure={handleDeleteProcedure}
            />
          </div>
        </Tabs.Item>

        <Tabs.Item active={activeTab === 3} title="Eventi e Documenti" icon={() => <Icon icon="solar:document-medicine-outline" />} iconPosition="left" className="gap-2">
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-bold">Eventi Paziente</h5>
              <Button color="primary" size="sm" onClick={handleAddEvent} className="flex items-center gap-2">
                <Icon icon="solar:add-circle-outline" height={20} />
                Nuovo Evento
              </Button>
            </div>

            <PatientEventList
              events={patientEvents}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </Tabs.Item>
      </Tabs>

      {/* Modale per la creazione/modifica degli eventi */}
      <PatientEventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        patientId={Number(id)}
        event={selectedEvent}
      />

      {/* Modale per la creazione/modifica degli interventi */}
      <DentalProcedureModal
        isOpen={isProcedureModalOpen}
        onClose={handleCloseProcedureModal}
        patientId={Number(id)}
        procedure={selectedProcedure}
      />
    </div>
  );
};

export default ViewPatient;
