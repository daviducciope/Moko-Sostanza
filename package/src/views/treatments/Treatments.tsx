import { Table, Badge, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";

const TreatmentsData = [
  {
    id: 1,
    name: "Pulizia dentale",
    category: "Igiene",
    duration: "30 min",
    price: "€80",
    status: "Attivo"
  },
  {
    id: 2,
    name: "Otturazione",
    category: "Conservativa",
    duration: "45 min",
    price: "€120",
    status: "Attivo"
  },
  {
    id: 3,
    name: "Estrazione",
    category: "Chirurgia",
    duration: "60 min",
    price: "€150",
    status: "Attivo"
  },
  {
    id: 4,
    name: "Radiografia panoramica",
    category: "Diagnostica",
    duration: "15 min",
    price: "€70",
    status: "Attivo"
  },
  {
    id: 5,
    name: "Impianto dentale",
    category: "Implantologia",
    duration: "90 min",
    price: "€1200",
    status: "Attivo"
  },
  {
    id: 6,
    name: "Sbiancamento",
    category: "Estetica",
    duration: "60 min",
    price: "€250",
    status: "Attivo"
  }
];

const Treatments = () => {
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <h5 className="card-title">Gestione Trattamenti</h5>
          <Button color="primary" className="flex items-center gap-2">
            <Icon icon="solar:add-circle-outline" height={20} />
            Nuovo Trattamento
          </Button>
        </div>
        <SimpleBar className="max-h-[600px]">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Nome</Table.HeadCell>
                <Table.HeadCell>Categoria</Table.HeadCell>
                <Table.HeadCell>Durata</Table.HeadCell>
                <Table.HeadCell>Prezzo</Table.HeadCell>
                <Table.HeadCell>Stato</Table.HeadCell>
                <Table.HeadCell>Azioni</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {TreatmentsData.map((treatment) => (
                  <Table.Row key={treatment.id}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{treatment.name}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{treatment.category}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{treatment.duration}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{treatment.price}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge className={treatment.status === "Attivo" ? "bg-lightsuccess text-success" : "bg-lighterror text-error"}>
                        {treatment.status}
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

export default Treatments;
