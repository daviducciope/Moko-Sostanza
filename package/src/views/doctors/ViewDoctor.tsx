import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import { Button, Card, Badge, Table } from 'flowbite-react';
import { Icon } from '@iconify/react';

// Dati di esempio per i dottori (stesso array usato in Doctors.tsx)
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Marco Rossi',
    specialization: 'Odontoiatria generale',
    email: 'marco.rossi@example.com',
    phone: '+39 123 456 7890',
    status: 'attivo',
    patients: 45,
    appointments: 12,
    address: 'Via Roma 123',
    city: 'Milano',
    postalCode: '20100',
    birthDate: '1975-05-15',
    gender: 'M',
    licenseNumber: '12345',
    startDate: '2010-03-01',
    notes: 'Specializzato in trattamenti conservativi e protesi fisse.'
  },
  {
    id: 2,
    name: 'Dr.ssa Laura Bianchi',
    specialization: 'Ortodonzia',
    email: 'laura.bianchi@example.com',
    phone: '+39 123 456 7891',
    status: 'attivo',
    patients: 38,
    appointments: 8,
    address: 'Via Verdi 45',
    city: 'Roma',
    postalCode: '00100',
    birthDate: '1980-08-22',
    gender: 'F',
    licenseNumber: '23456',
    startDate: '2012-06-15',
    notes: 'Specializzata in ortodonzia invisibile e trattamenti per bambini.'
  },
  // Altri dottori...
];

// Dati di esempio per gli appuntamenti recenti
const recentAppointments = [
  { id: 1, patient: 'Mario Rossi', date: '15/11/2023', time: '09:00 - 10:00', treatment: 'Visita di controllo' },
  { id: 2, patient: 'Giulia Bianchi', date: '16/11/2023', time: '11:00 - 12:00', treatment: 'Pulizia dentale' },
  { id: 3, patient: 'Luca Verdi', date: '17/11/2023', time: '14:30 - 15:30', treatment: 'Otturazione' },
  { id: 4, patient: 'Sofia Neri', date: '18/11/2023', time: '10:00 - 11:00', treatment: 'Estrazione' },
  { id: 5, patient: 'Marco Gialli', date: '20/11/2023', time: '16:00 - 17:00', treatment: 'Visita ortodontica' }
];

const ViewDoctor = () => {
  const { id } = useParams();
  const location = useLocation();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');
  
  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/doctors' : '/doctors';

  // Carica i dati del dottore
  useEffect(() => {
    // In un'applicazione reale, qui ci sarebbe una chiamata API
    // per ottenere i dati del dottore con l'ID specificato
    const doctorId = parseInt(id || '0');
    const foundDoctor = doctorsData.find(doc => doc.id === doctorId);
    
    if (foundDoctor) {
      setDoctor(foundDoctor);
    }
    
    setLoading(false);
  }, [id]);

  // Funzione per ottenere il colore del badge in base allo stato
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attivo':
        return 'bg-lightsuccess text-success';
      case 'in ferie':
        return 'bg-lightwarning text-warning';
      case 'non disponibile':
        return 'bg-lighterror text-error';
      default:
        return 'bg-lightgray text-gray-500';
    }
  };

  // Funzione per formattare lo stato
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Funzione per formattare la data
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
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

  if (!doctor) {
    return (
      <div className="text-center p-6">
        <h5 className="text-xl font-bold mb-2">Dottore non trovato</h5>
        <p className="mb-4">Il dottore richiesto non è stato trovato nel sistema.</p>
        <Button color="primary" as={Link} to={basePath}>
          Torna all'elenco dottori
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Dettagli Dottore</h5>
          <Link to={basePath} className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'elenco dottori</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button color="secondary" as={Link} to={`${basePath}/edit/${doctor.id}`} className="flex items-center gap-2">
            <Icon icon="solar:pen-outline" height={20} />
            Modifica
          </Button>
          <Button color="primary" className="flex items-center gap-2">
            <Icon icon="solar:calendar-mark-line-duotone" height={20} />
            Visualizza Calendario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Informazioni principali */}
        <Card className="col-span-1">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h5 className="text-lg font-bold">{doctor.name}</h5>
              <Badge className={getStatusColor(doctor.status)}>
                {formatStatus(doctor.status)}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specializzazione</p>
                <p className="font-medium">{doctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{doctor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Telefono</p>
                <p className="font-medium">{doctor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Numero di Licenza</p>
                <p className="font-medium">{doctor.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data di Inizio</p>
                <p className="font-medium">{formatDate(doctor.startDate)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Informazioni personali */}
        <Card className="col-span-1">
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-4">Informazioni Personali</h5>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Indirizzo</p>
                <p className="font-medium">{doctor.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Città</p>
                <p className="font-medium">{doctor.city}, {doctor.postalCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data di Nascita</p>
                <p className="font-medium">{formatDate(doctor.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Genere</p>
                <p className="font-medium">
                  {doctor.gender === 'M' ? 'Maschile' : doctor.gender === 'F' ? 'Femminile' : doctor.gender}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistiche */}
        <Card className="col-span-1">
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-4">Statistiche</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lightprimary text-primary p-4 rounded-lg text-center">
                <h6 className="text-2xl font-bold">{doctor.patients}</h6>
                <p className="text-sm">Pazienti</p>
              </div>
              <div className="bg-lightsuccess text-success p-4 rounded-lg text-center">
                <h6 className="text-2xl font-bold">{doctor.appointments}</h6>
                <p className="text-sm">Appuntamenti</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Note</p>
              <p className="font-medium">{doctor.notes || 'Nessuna nota disponibile'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Appuntamenti recenti */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-bold">Appuntamenti Recenti</h5>
          <Button color="light" size="sm" as={Link} to="/appointments" className="flex items-center gap-2">
            <Icon icon="solar:calendar-mark-line-duotone" height={16} />
            Tutti gli Appuntamenti
          </Button>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Paziente</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
            <Table.HeadCell>Ora</Table.HeadCell>
            <Table.HeadCell>Trattamento</Table.HeadCell>
            <Table.HeadCell>Azioni</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {recentAppointments.map(appointment => (
              <Table.Row key={appointment.id}>
                <Table.Cell>{appointment.patient}</Table.Cell>
                <Table.Cell>{appointment.date}</Table.Cell>
                <Table.Cell>{appointment.time}</Table.Cell>
                <Table.Cell>{appointment.treatment}</Table.Cell>
                <Table.Cell>
                  <Button color="primary" size="xs">
                    <Icon icon="solar:eye-outline" height={16} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default ViewDoctor;
