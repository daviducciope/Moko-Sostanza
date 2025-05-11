import { Icon } from "@iconify/react";
import { Badge, Button, Table } from "flowbite-react";
import PageContainer from "../../components/container/PageContainer";

const RoomList = () => {
  const rooms = [
    {
      id: 1,
      number: "101",
      department: "Ortodonzia",
      equipment: ["Riunito dentale", "Radiografico"],
      status: "Disponibile",
    },
    {
      id: 2,
      number: "102",
      department: "Chirurgia",
      equipment: ["Riunito dentale", "Microscopio"],
      status: "Occupata",
    },
    {
      id: 3,
      number: "201",
      department: "Igiene Dentale",
      equipment: ["Riunito dentale"],
      status: "Manutenzione",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Disponibile: "success",
      Occupata: "warning",
      Manutenzione: "failure",
    };
    return statusColors[status] || "gray";
  };

  return (
    <div className="rounded-xl shadow-md bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold text-gray-900">Stanze</h5>
        <Button color="primary" size="sm">
          <Icon icon="solar:add-circle-linear" className="mr-2" height={20} />
          Nuova Stanza
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Numero Stanza</Table.HeadCell>
          <Table.HeadCell>Reparto</Table.HeadCell>
          <Table.HeadCell>Attrezzature</Table.HeadCell>
          <Table.HeadCell>Stato</Table.HeadCell>
          <Table.HeadCell>Azioni</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {rooms.map((room) => (
            <Table.Row key={room.id} className="bg-white">
              <Table.Cell className="font-medium text-gray-900">
                {room.number}
              </Table.Cell>
              <Table.Cell>{room.department}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2 flex-wrap">
                  {room.equipment.map((item, index) => (
                    <Badge key={index} color="info" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell>
                <Badge color={getStatusBadge(room.status)}>
                  {room.status}
                </Badge>
              </Table.Cell>
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

const Rooms = () => {
  return (
    <PageContainer title="Gestione Stanze" description="Gestione delle stanze della clinica">
      <RoomList />
    </PageContainer>
  );
};

export default Rooms;
