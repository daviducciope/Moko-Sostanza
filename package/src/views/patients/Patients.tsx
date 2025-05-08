import { Table, Badge, Button, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { HiSearch } from "react-icons/hi";

const PatientsData = [
  {
    id: 1,
    name: "Mario Rossi",
    phone: "+39 333 1234567",
    email: "mario.rossi@example.com",
    lastVisit: "15/05/2023",
    nextAppointment: "22/06/2023",
    status: "Attivo"
  },
  {
    id: 2,
    name: "Giulia Bianchi",
    phone: "+39 333 7654321",
    email: "giulia.bianchi@example.com",
    lastVisit: "03/04/2023",
    nextAppointment: "18/06/2023",
    status: "Attivo"
  },
  {
    id: 3,
    name: "Luca Verdi",
    phone: "+39 333 9876543",
    email: "luca.verdi@example.com",
    lastVisit: "22/03/2023",
    nextAppointment: "Non programmato",
    status: "Inattivo"
  },
  {
    id: 4,
    name: "Sofia Neri",
    phone: "+39 333 3456789",
    email: "sofia.neri@example.com",
    lastVisit: "10/05/2023",
    nextAppointment: "25/06/2023",
    status: "Attivo"
  },
  {
    id: 5,
    name: "Marco Gialli",
    phone: "+39 333 6789012",
    email: "marco.gialli@example.com",
    lastVisit: "01/02/2023",
    nextAppointment: "Non programmato",
    status: "Inattivo"
  }
];

const Patients = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(PatientsData);

  // Filtra i pazienti in base al termine di ricerca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredPatients(PatientsData);
    } else {
      const filtered = PatientsData.filter(patient =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.email.toLowerCase().includes(term.toLowerCase()) ||
        patient.phone.includes(term)
      );
      setFilteredPatients(filtered);
    }
  };

  // Verifica se siamo nella pagina di ricerca
  const isSearchPage = location.pathname === "/patients/search";

  // Imposta il focus sul campo di ricerca quando si accede alla pagina di ricerca
  useEffect(() => {
    if (isSearchPage) {
      const searchInput = document.getElementById('search-patient');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isSearchPage]);

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h5 className="card-title">Gestione Pazienti</h5>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <TextInput
                id="search-patient"
                type="text"
                placeholder="Cerca paziente..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full md:w-auto"
                icon={HiSearch}
              />
            </div>
            <Button color="primary" className="flex items-center gap-2" as={Link} to="/patients/new">
              <Icon icon="solar:add-circle-outline" height={20} />
              Nuovo Paziente
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="table-auto w-full">
            <Table.Head>
              <Table.HeadCell className="p-4">Nome</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden sm:table-cell">Telefono</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden md:table-cell">Email</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden lg:table-cell">Ultima Visita</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden xl:table-cell">Prossimo Appuntamento</Table.HeadCell>
              <Table.HeadCell className="p-4">Stato</Table.HeadCell>
              <Table.HeadCell className="p-4">Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                <Table.Row key={patient.id}>
                  <Table.Cell className="p-4">
                    <div className="flex gap-2 items-center">
                      <div>
                        <h6 className="text-sm font-medium">{patient.name}</h6>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="p-4 hidden sm:table-cell">
                    <p className="text-sm">{patient.phone}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4 hidden md:table-cell">
                    <p className="text-sm">{patient.email}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4 hidden lg:table-cell">
                    <p className="text-sm">{patient.lastVisit}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4 hidden xl:table-cell">
                    <p className="text-sm">{patient.nextAppointment}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4">
                    <Badge className={patient.status === "Attivo" ? "bg-lightsuccess text-success" : "bg-lighterror text-error"}>
                      {patient.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="p-4">
                    <div className="flex gap-2">
                      <Button color="primary" size="xs" as={Link} to={`/patients/view/${patient.id}`}>
                        <Icon icon="solar:eye-outline" height={16} />
                      </Button>
                      <Button color="secondary" size="xs" as={Link} to={`/patients/edit/${patient.id}`}>
                        <Icon icon="solar:pen-outline" height={16} />
                      </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={7} className="text-center py-4">
                      <p className="text-gray-500">Nessun paziente trovato</p>
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

export default Patients;
