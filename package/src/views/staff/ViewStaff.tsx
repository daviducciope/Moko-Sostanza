import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import { Button, Card, Badge, Table } from 'flowbite-react';
import { Icon } from '@iconify/react';

// Dati di esempio per il personale (stesso array usato in Staff.tsx)
const staffData = [
  {
    id: 1,
    name: 'Maria Bianchi',
    role: 'Assistente dentale',
    email: 'maria.bianchi@example.com',
    phone: '+39 123 456 7890',
    status: 'attivo',
    department: 'Assistenza',
    hireDate: '2018-05-10',
    address: 'Via Roma 123',
    city: 'Milano',
    postalCode: '20100',
    birthDate: '1985-07-15',
    gender: 'F',
    salary: '1800',
    notes: 'Specializzata in assistenza per interventi di implantologia.'
  },
  {
    id: 2,
    name: 'Giovanni Rossi',
    role: 'Receptionist',
    email: 'giovanni.rossi@example.com',
    phone: '+39 123 456 7891',
    status: 'attivo',
    department: 'Amministrazione',
    hireDate: '2019-03-15',
    address: 'Via Verdi 45',
    city: 'Roma',
    postalCode: '00100',
    birthDate: '1990-03-22',
    gender: 'M',
    salary: '1600',
    notes: 'Ottima conoscenza dell\'inglese e del tedesco.'
  },
  // Altri dipendenti...
];

// Dati di esempio per le presenze recenti
const recentAttendance = [
  { id: 1, date: '15/11/2023', checkIn: '08:30', checkOut: '17:30', status: 'presente' },
  { id: 2, date: '14/11/2023', checkIn: '08:45', checkOut: '17:15', status: 'presente' },
  { id: 3, date: '13/11/2023', checkIn: '08:30', checkOut: '17:30', status: 'presente' },
  { id: 4, date: '10/11/2023', checkIn: '09:00', checkOut: '16:30', status: 'presente' },
  { id: 5, date: '09/11/2023', checkIn: '', checkOut: '', status: 'assente' }
];

const ViewStaff = () => {
  const { id } = useParams();
  const location = useLocation();
  const [staff, setStaff] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');
  
  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/staff' : '/staff';

  // Carica i dati del dipendente
  useEffect(() => {
    // In un'applicazione reale, qui ci sarebbe una chiamata API
    // per ottenere i dati del dipendente con l'ID specificato
    const staffId = parseInt(id || '0');
    const foundStaff = staffData.find(s => s.id === staffId);
    
    if (foundStaff) {
      setStaff(foundStaff);
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
      case 'presente':
        return 'bg-lightsuccess text-success';
      case 'assente':
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

  if (!staff) {
    return (
      <div className="text-center p-6">
        <h5 className="text-xl font-bold mb-2">Dipendente non trovato</h5>
        <p className="mb-4">Il dipendente richiesto non è stato trovato nel sistema.</p>
        <Button color="primary" as={Link} to={basePath}>
          Torna all'elenco del personale
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Dettagli Dipendente</h5>
          <Link to={basePath} className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'elenco del personale</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button color="secondary" as={Link} to={`${basePath}/edit/${staff.id}`} className="flex items-center gap-2">
            <Icon icon="solar:pen-outline" height={20} />
            Modifica
          </Button>
          <Button color="primary" as={Link} to={`${basePath}/attendance`} className="flex items-center gap-2">
            <Icon icon="solar:checklist-minimalistic-outline" height={20} />
            Visualizza Presenze
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Informazioni principali */}
        <Card className="col-span-1">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h5 className="text-lg font-bold">{staff.name}</h5>
              <Badge className={getStatusColor(staff.status)}>
                {formatStatus(staff.status)}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ruolo</p>
                <p className="font-medium">{staff.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{staff.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Telefono</p>
                <p className="font-medium">{staff.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reparto</p>
                <p className="font-medium">{staff.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data di Assunzione</p>
                <p className="font-medium">{formatDate(staff.hireDate)}</p>
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
                <p className="font-medium">{staff.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Città</p>
                <p className="font-medium">{staff.city}, {staff.postalCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data di Nascita</p>
                <p className="font-medium">{formatDate(staff.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Genere</p>
                <p className="font-medium">
                  {staff.gender === 'M' ? 'Maschile' : staff.gender === 'F' ? 'Femminile' : staff.gender}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Informazioni contrattuali */}
        <Card className="col-span-1">
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-4">Informazioni Contrattuali</h5>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stipendio</p>
                <p className="font-medium">€ {staff.salary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Anzianità</p>
                <p className="font-medium">
                  {new Date().getFullYear() - parseInt(staff.hireDate.split('-')[0])} anni
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Note</p>
                <p className="font-medium">{staff.notes || 'Nessuna nota disponibile'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Presenze recenti */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-bold">Presenze Recenti</h5>
          <Button color="light" size="sm" as={Link} to={`${basePath}/attendance`} className="flex items-center gap-2">
            <Icon icon="solar:checklist-minimalistic-outline" height={16} />
            Tutte le Presenze
          </Button>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Data</Table.HeadCell>
            <Table.HeadCell>Entrata</Table.HeadCell>
            <Table.HeadCell>Uscita</Table.HeadCell>
            <Table.HeadCell>Stato</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {recentAttendance.map(attendance => (
              <Table.Row key={attendance.id}>
                <Table.Cell>{attendance.date}</Table.Cell>
                <Table.Cell>{attendance.checkIn || '-'}</Table.Cell>
                <Table.Cell>{attendance.checkOut || '-'}</Table.Cell>
                <Table.Cell>
                  <Badge className={getStatusColor(attendance.status)}>
                    {formatStatus(attendance.status)}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default ViewStaff;
