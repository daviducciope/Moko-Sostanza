import { useState, useEffect } from 'react';
import { Table, Badge, Button, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

// Dati di esempio per il personale
const staffData = [
  {
    id: 1,
    name: 'Maria Bianchi',
    role: 'Assistente dentale',
    email: 'maria.bianchi@example.com',
    phone: '+39 123 456 7890',
    status: 'attivo',
    department: 'Assistenza',
    hireDate: '2018-05-10'
  },
  {
    id: 2,
    name: 'Giovanni Rossi',
    role: 'Receptionist',
    email: 'giovanni.rossi@example.com',
    phone: '+39 123 456 7891',
    status: 'attivo',
    department: 'Amministrazione',
    hireDate: '2019-03-15'
  },
  {
    id: 3,
    name: 'Lucia Verdi',
    role: 'Igienista dentale',
    email: 'lucia.verdi@example.com',
    phone: '+39 123 456 7892',
    status: 'attivo',
    department: 'Igiene',
    hireDate: '2017-11-20'
  },
  {
    id: 4,
    name: 'Roberto Neri',
    role: 'Amministratore',
    email: 'roberto.neri@example.com',
    phone: '+39 123 456 7893',
    status: 'in ferie',
    department: 'Amministrazione',
    hireDate: '2015-08-05'
  },
  {
    id: 5,
    name: 'Francesca Gialli',
    role: 'Assistente dentale',
    email: 'francesca.gialli@example.com',
    phone: '+39 123 456 7894',
    status: 'attivo',
    department: 'Assistenza',
    hireDate: '2020-01-15'
  },
  {
    id: 6,
    name: 'Marco Blu',
    role: 'Tecnico di laboratorio',
    email: 'marco.blu@example.com',
    phone: '+39 123 456 7895',
    status: 'non disponibile',
    department: 'Laboratorio',
    hireDate: '2016-06-22'
  },
  {
    id: 7,
    name: 'Giulia Rosa',
    role: 'Receptionist',
    email: 'giulia.rosa@example.com',
    phone: '+39 123 456 7896',
    status: 'attivo',
    department: 'Amministrazione',
    hireDate: '2021-02-10'
  }
];

const Staff = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStaff, setFilteredStaff] = useState(staffData);

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/staff' : '/staff';

  // Filtra il personale in base al termine di ricerca
  useEffect(() => {
    if (searchTerm) {
      const filtered = staffData.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff(staffData);
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

  // Funzione per formattare la data
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h5 className="card-title">Gestione Personale</h5>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <TextInput
                id="search-staff"
                type="text"
                placeholder="Cerca dipendente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-auto"
                icon={HiSearch}
              />
            </div>
            <Button color="primary" className="flex items-center gap-2" as={Link} to={`${basePath}/new`}>
              <Icon icon="solar:add-circle-outline" height={20} />
              Nuovo Dipendente
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable className="table-auto w-full">
            <Table.Head>
              <Table.HeadCell className="p-4">Nome</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden sm:table-cell">Ruolo</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden md:table-cell">Email</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden lg:table-cell">Telefono</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden sm:table-cell">Reparto</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden xl:table-cell">Data Assunzione</Table.HeadCell>
              <Table.HeadCell className="p-4">Stato</Table.HeadCell>
              <Table.HeadCell className="p-4">Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <Table.Row key={staff.id}>
                    <Table.Cell className="p-4">
                      <div className="flex gap-2 items-center">
                        <div>
                          <h6 className="text-sm font-medium">{staff.name}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden sm:table-cell">
                      <p className="text-sm">{staff.role}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden md:table-cell">
                      <p className="text-sm">{staff.email}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden lg:table-cell">
                      <p className="text-sm">{staff.phone}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden sm:table-cell">
                      <p className="text-sm">{staff.department}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4 hidden xl:table-cell">
                      <p className="text-sm">{formatDate(staff.hireDate)}</p>
                    </Table.Cell>
                    <Table.Cell className="p-4">
                      <Badge className={getStatusColor(staff.status)}>
                        {formatStatus(staff.status)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="p-4">
                      <div className="flex gap-2">
                        <Button color="primary" size="xs" as={Link} to={`${basePath}/view/${staff.id}`}>
                          <Icon icon="solar:eye-outline" height={16} />
                        </Button>
                        <Button color="secondary" size="xs" as={Link} to={`${basePath}/edit/${staff.id}`}>
                          <Icon icon="solar:pen-outline" height={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={8} className="text-center py-4">
                    <p className="text-gray-500">Nessun dipendente trovato</p>
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

export default Staff;
