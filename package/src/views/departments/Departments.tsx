import { Icon } from "@iconify/react";
import { Button, Table } from "flowbite-react";
import PageContainer from "../../components/container/PageContainer";

const DepartmentList = () => {
  const departments = [
    {
      id: 1,
      name: "Ortodonzia",
      head: "Dr. Bianchi",
      rooms: 3,
      staff: 5,
    },
    {
      id: 2,
      name: "Chirurgia",
      head: "Dr. Rossi",
      rooms: 2,
      staff: 4,
    },
    {
      id: 3,
      name: "Igiene Dentale",
      head: "Dr.ssa Verdi",
      rooms: 4,
      staff: 6,
    },
  ];

  return (
    <div className="rounded-xl shadow-md bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-900">Reparti</h5>
        <Button color="primary" size="sm">
          <Icon icon="solar:add-circle-linear" className="mr-2" height={20} />
          Nuovo Reparto
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nome Reparto</Table.HeadCell>
          <Table.HeadCell>Responsabile</Table.HeadCell>
          <Table.HeadCell>Numero Stanze</Table.HeadCell>
          <Table.HeadCell>Personale</Table.HeadCell>
          <Table.HeadCell>Azioni</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {departments.map((department) => (
            <Table.Row key={department.id} className="bg-white">
              <Table.Cell className="font-medium text-gray-900">
                {department.name}
              </Table.Cell>
              <Table.Cell>{department.head}</Table.Cell>
              <Table.Cell>{department.rooms}</Table.Cell>
              <Table.Cell>{department.staff}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <Button color="info" size="sm">
                    <Icon icon="solar:pen-2-linear" height={20} />
                  </Button>
                  <Button color="failure" size="sm">
                    <Icon icon="solar:trash-bin-trash-linear" height={20} />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const Departments = () => {
  return (
    <PageContainer title="Gestione Reparti" description="Gestione dei reparti della clinica">
      <DepartmentList />
    </PageContainer>
  );
};

export default Departments;
