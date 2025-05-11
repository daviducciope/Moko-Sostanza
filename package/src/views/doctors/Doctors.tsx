import { useState, useEffect } from 'react';
import { Table, Badge, Button, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

// Dati di esempio per i dottori
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Marco Rossi',
    specialization: 'Odontoiatria generale',
    email: 'marco.rossi@example.com',
    phone: '+39 123 456 7890',
    status: 'attivo',
    patients: 45,
    appointments: 12
  },
  {
    id: 2,
    name: 'Dr.ssa Laura Bianchi',
    specialization: 'Ortodonzia',
    email: 'laura.bianchi@example.com',
    phone: '+39 123 456 7891',
    status: 'attivo',
    patients: 38,
    appointments: 8
  },
  {
    id: 3,
    name: 'Dr. Antonio Verdi',
    specialization: 'Chirurgia orale',
    email: 'antonio.verdi@example.com',
    phone: '+39 123 456 7892',
    status: 'attivo',
    patients: 32,
    appointments: 5
  },
  {
    id: 4,
    name: 'Dr.ssa Giulia Neri',
    specialization: 'Endodonzia',
    email: 'giulia.neri@example.com',
    phone: '+39 123 456 7893',
    status: 'in ferie',
    patients: 28,
    appointments: 0
  },
  {
    id: 5,
    name: 'Dr. Luca Gialli',
    specialization: 'Implantologia',
    email: 'luca.gialli@example.com',
    phone: '+39 123 456 7894',
    status: 'attivo',
    patients: 41,
    appointments: 10
  },
  {
    id: 6,
    name: 'Dr.ssa Sofia Blu',
    specialization: 'Odontoiatria pediatrica',
    email: 'sofia.blu@example.com',
    phone: '+39 123 456 7895',
    status: 'attivo',
    patients: 52,
    appointments: 15
  },
  {
    id: 7,
    name: 'Dr. Roberto Viola',
    specialization: 'Parodontologia',
    email: 'roberto.viola@example.com',
    phone: '+39 123 456 7896',
    status: 'non disponibile',
    patients: 30,
    appointments: 0
  }
];

const Doctors = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/doctors' : '/doctors';

  // Filtra i dottori in base al termine di ricerca
  useEffect(() => {
    if (searchTerm) {
      const filtered = doctorsData.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctorsData);
    }
  }, [searchTerm]);

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

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h5 className="card-title">Gestione Dottori</h5>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <TextInput
                id="search-doctors"
                type="text"
                placeholder="Cerca dottore..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-auto"
                icon={HiSearch}
              />
            </div>
            <Button color="primary" className="flex items-center gap-2" as={Link} to={`${basePath}/new`}>
              <Icon icon="solar:add-circle-outline" height={20} />
              Nuovo Dottore
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable className="table-auto w-full">
            <Table.Head>
              <Table.HeadCell className="p-4">Nome</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden sm:table-cell">Specializzazione</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden md:table-cell">Email</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden lg:table-cell">Telefono</Table.HeadCell>
              <Table.HeadCell className="p-4">Stato</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden xl:table-cell">Pazienti</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden xl:table-cell">Appuntamenti</Table.HeadCell>
              <Table.HeadCell className="p-4">Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Table.Row key={doctor.id}>
                    <Table.Cell className="p-4">
                      <div className="flex gap-2 items-center">
                        <div>
                          <h6 className="text-sm font-medium">{doctor.name}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden sm:table-cell">
                      <p className="text-sm">{doctor.specialization}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden md:table-cell">
                      <p className="text-sm">{doctor.email}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden lg:table-cell">
                      <p className="text-sm">{doctor.phone}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4">
                      <Badge className={getStatusColor(doctor.status)}>
                        {formatStatus(doctor.status)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden xl:table-cell">
                      <p className="text-sm">{doctor.patients}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden xl:table-cell">
                      <p className="text-sm">{doctor.appointments}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4">
                      <div className="flex gap-2">
                        <Button color="primary" size="xs" as={Link} to={`${basePath}/view/${doctor.id}`}>
                          <Icon icon="solar:eye-outline" height={16} />
                        </Button>
                        <Button color="secondary" size="xs" as={Link} to={`${basePath}/edit/${doctor.id}`}>
                          <Icon icon="solar:pen-outline" height={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={8} className="text-center py-4">
                    <p className="text-gray-500">Nessun dottore trovato</p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Doctors;
