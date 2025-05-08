import { useState, useEffect } from 'react';
import { Table, Badge, Button, TextInput, Select, Card } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router';
import { HiSearch } from 'react-icons/hi';

// Dati di esempio per il personale
const staffData = [
  {
    id: 1,
    name: 'Maria Bianchi',
    role: 'Assistente dentale',
    department: 'Assistenza'
  },
  {
    id: 2,
    name: 'Giovanni Rossi',
    role: 'Receptionist',
    department: 'Amministrazione'
  },
  {
    id: 3,
    name: 'Lucia Verdi',
    role: 'Igienista dentale',
    department: 'Igiene'
  },
  {
    id: 4,
    name: 'Roberto Neri',
    role: 'Amministratore',
    department: 'Amministrazione'
  },
  {
    id: 5,
    name: 'Francesca Gialli',
    role: 'Assistente dentale',
    department: 'Assistenza'
  },
  {
    id: 6,
    name: 'Marco Blu',
    role: 'Tecnico di laboratorio',
    department: 'Laboratorio'
  },
  {
    id: 7,
    name: 'Giulia Rosa',
    role: 'Receptionist',
    department: 'Amministrazione'
  }
];

// Dati di esempio per le presenze
const attendanceData = [
  {
    staffId: 1,
    records: [
      { date: '2023-11-20', checkIn: '08:30', checkOut: '17:30', status: 'presente' },
      { date: '2023-11-21', checkIn: '08:45', checkOut: '17:15', status: 'presente' },
      { date: '2023-11-22', checkIn: '08:30', checkOut: '17:30', status: 'presente' },
      { date: '2023-11-23', checkIn: '09:00', checkOut: '16:30', status: 'presente' },
      { date: '2023-11-24', checkIn: '', checkOut: '', status: 'assente' }
    ]
  },
  {
    staffId: 2,
    records: [
      { date: '2023-11-20', checkIn: '08:15', checkOut: '17:00', status: 'presente' },
      { date: '2023-11-21', checkIn: '08:30', checkOut: '17:15', status: 'presente' },
      { date: '2023-11-22', checkIn: '08:45', checkOut: '17:30', status: 'presente' },
      { date: '2023-11-23', checkIn: '08:30', checkOut: '17:00', status: 'presente' },
      { date: '2023-11-24', checkIn: '08:30', checkOut: '17:00', status: 'presente' }
    ]
  },
  {
    staffId: 3,
    records: [
      { date: '2023-11-20', checkIn: '09:00', checkOut: '18:00', status: 'presente' },
      { date: '2023-11-21', checkIn: '09:15', checkOut: '18:15', status: 'presente' },
      { date: '2023-11-22', checkIn: '', checkOut: '', status: 'ferie' },
      { date: '2023-11-23', checkIn: '', checkOut: '', status: 'ferie' },
      { date: '2023-11-24', checkIn: '', checkOut: '', status: 'ferie' }
    ]
  },
  // Altri dipendenti...
];

const Attendance = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('2023-11-24'); // Oggi come default
  const [filteredStaff, setFilteredStaff] = useState(staffData);

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/staff' : '/staff';

  // Filtra il personale in base al termine di ricerca e al reparto
  useEffect(() => {
    let filtered = staffData;

    if (searchTerm) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(staff => staff.department === departmentFilter);
    }

    setFilteredStaff(filtered);
  }, [searchTerm, departmentFilter]);

  // Estrai i reparti unici per il filtro
  const departments = [...new Set(staffData.map(staff => staff.department))];

  // Funzione per ottenere il colore del badge in base allo stato
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'presente':
        return 'bg-lightsuccess text-success';
      case 'assente':
        return 'bg-lighterror text-error';
      case 'ferie':
        return 'bg-lightwarning text-warning';
      case 'malattia':
        return 'bg-lightprimary text-primary';
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

  // Funzione per ottenere i dati di presenza di un dipendente per una data specifica
  const getAttendanceRecord = (staffId: number, date: string) => {
    const staffAttendance = attendanceData.find(a => a.staffId === staffId);
    if (!staffAttendance) return null;

    return staffAttendance.records.find(r => r.date === date) || null;
  };

  // Genera le date della settimana corrente
  const getCurrentWeekDates = () => {
    const today = new Date(dateFilter);
    const day = today.getDay(); // 0 = domenica, 1 = lunedì, ...
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Aggiusta se oggi è domenica

    const monday = new Date(today.setDate(diff));
    const weekDates = [];

    for (let i = 0; i < 5; i++) { // Solo giorni lavorativi (lun-ven)
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }

    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h5 className="card-title">Gestione Presenze</h5>
            <Button color="primary" className="flex items-center gap-2">
              <Icon icon="solar:printer-outline" height={20} />
              Stampa Presenze
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <TextInput
                id="search-staff"
                type="text"
                placeholder="Cerca dipendente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={HiSearch}
              />
            </div>
            <Select
              id="department-filter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full"
            >
              <option value="">Tutti i reparti</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </Select>
            <TextInput
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
            <div className="hidden lg:block"></div> {/* Spacer per allineamento */}
          </div>
        </div>

        {/* Riepilogo presenze */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">Presenti</h6>
              <div className="text-3xl font-bold text-success">5</div>
              <div className="text-sm text-gray-500 mt-2">su 7 dipendenti</div>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">Assenti</h6>
              <div className="text-3xl font-bold text-error">1</div>
              <div className="text-sm text-gray-500 mt-2">su 7 dipendenti</div>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">In Ferie</h6>
              <div className="text-3xl font-bold text-warning">1</div>
              <div className="text-sm text-gray-500 mt-2">su 7 dipendenti</div>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">In Malattia</h6>
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-gray-500 mt-2">su 7 dipendenti</div>
            </div>
          </Card>
        </div>

        {/* Tabella presenze settimanali */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h5 className="text-lg font-bold">Presenze Settimanali</h5>
            <div className="flex gap-2">
              <Button color="light" size="sm" className="flex items-center gap-1">
                <Icon icon="solar:arrow-left-outline" height={16} />
                <span className="hidden sm:inline">Settimana Precedente</span>
              </Button>
              <Button color="light" size="sm" className="flex items-center gap-1">
                <span className="hidden sm:inline">Settimana Successiva</span>
                <Icon icon="solar:arrow-right-outline" height={16} />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]"> {/* Larghezza minima per garantire la visualizzazione su dispositivi piccoli */}
              <Table className="table-auto w-full">
                <Table.Head>
                  <Table.HeadCell className="p-4">Dipendente</Table.HeadCell>
                  <Table.HeadCell className="p-4 hidden md:table-cell">Ruolo</Table.HeadCell>
                  <Table.HeadCell className="p-4 hidden lg:table-cell">Reparto</Table.HeadCell>
                  {weekDates.map((date, index) => (
                    <Table.HeadCell key={index} className="p-4">
                      <div className="text-center">
                        <div>{['Lun', 'Mar', 'Mer', 'Gio', 'Ven'][index]}</div>
                        <div className="text-xs">{formatDate(date)}</div>
                      </div>
                    </Table.HeadCell>
                  ))}
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
                        <Table.Cell className="p-4 hidden md:table-cell">
                          <p className="text-sm">{staff.role}</p>
                        </Table.Cell>
                        <Table.Cell className="p-4 hidden lg:table-cell">
                          <p className="text-sm">{staff.department}</p>
                        </Table.Cell>
                        {weekDates.map((date, index) => {
                          const record = getAttendanceRecord(staff.id, date);
                          return (
                            <Table.Cell key={index} className="p-4 text-center">
                              {record ? (
                                <>
                                  <Badge className={getStatusColor(record.status)}>
                                    {formatStatus(record.status)}
                                  </Badge>
                                  {record.status === 'presente' && (
                                    <div className="text-xs mt-1">
                                      {record.checkIn} - {record.checkOut}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Badge className="bg-lightgray text-gray-500">
                                  Non registrato
                                </Badge>
                              )}
                            </Table.Cell>
                          );
                        })}
                        <Table.Cell className="p-4">
                          <div className="flex gap-2 justify-center">
                            <Button color="primary" size="xs" as={Link} to={`${basePath}/view/${staff.id}`}>
                              <Icon icon="solar:eye-outline" height={16} />
                            </Button>
                            <Button color="secondary" size="xs">
                              <Icon icon="solar:pen-outline" height={16} />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell colSpan={8 + weekDates.length} className="text-center py-4">
                        <p className="text-gray-500">Nessun dipendente trovato</p>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Card>

        {/* Registrazione presenze */}
        <Card>
          <h5 className="text-lg font-bold mb-4">Registra Presenza</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="mb-2 block">
                <label htmlFor="staff-select" className="text-sm font-medium">Dipendente</label>
              </div>
              <Select id="staff-select" className="w-full">
                <option value="" disabled selected>Seleziona dipendente</option>
                {staffData.map((staff) => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="date-select" className="text-sm font-medium">Data</label>
              </div>
              <TextInput id="date-select" type="date" value={dateFilter} className="w-full" />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="status-select" className="text-sm font-medium">Stato</label>
              </div>
              <Select id="status-select" className="w-full">
                <option value="presente">Presente</option>
                <option value="assente">Assente</option>
                <option value="ferie">Ferie</option>
                <option value="malattia">Malattia</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button color="primary" className="w-full">
                Registra
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Attendance;
