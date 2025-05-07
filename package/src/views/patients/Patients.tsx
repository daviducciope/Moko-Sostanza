import { Table, Badge, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";

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
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <h5 className="card-title">Gestione Pazienti</h5>
          <Button color="primary" className="flex items-center gap-2">
            <Icon icon="solar:add-circle-outline" height={20} />
            Nuovo Paziente
          </Button>
        </div>
        <SimpleBar className="max-h-[600px]">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Nome</Table.HeadCell>
                <Table.HeadCell>Telefono</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Ultima Visita</Table.HeadCell>
                <Table.HeadCell>Prossimo Appuntamento</Table.HeadCell>
                <Table.HeadCell>Stato</Table.HeadCell>
                <Table.HeadCell>Azioni</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {PatientsData.map((patient) => (
                  <Table.Row key={patient.id}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{patient.name}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{patient.phone}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{patient.email}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{patient.lastVisit}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{patient.nextAppointment}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge className={patient.status === "Attivo" ? "bg-lightsuccess text-success" : "bg-lighterror text-error"}>
                        {patient.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button color="primary" size="xs">
                          <Icon icon="solar:eye-outline" height={16} />
                        </Button>
                        <Button color="secondary" size="xs">
                          <Icon icon="solar:pen-outline" height={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default Patients;
