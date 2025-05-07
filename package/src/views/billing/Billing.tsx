import { Table, Badge, Button, Select, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { HiSearch } from "react-icons/hi";

const BillingData = [
  {
    id: 1,
    patient: "Mario Rossi",
    date: "15/05/2023",
    invoice: "INV-2023-001",
    amount: "€180",
    status: "Pagato"
  },
  {
    id: 2,
    patient: "Giulia Bianchi",
    date: "03/04/2023",
    invoice: "INV-2023-002",
    amount: "€350",
    status: "Pagato"
  },
  {
    id: 3,
    patient: "Luca Verdi",
    date: "22/03/2023",
    invoice: "INV-2023-003",
    amount: "€120",
    status: "In attesa"
  },
  {
    id: 4,
    patient: "Sofia Neri",
    date: "10/05/2023",
    invoice: "INV-2023-004",
    amount: "€450",
    status: "Pagato"
  },
  {
    id: 5,
    patient: "Marco Gialli",
    date: "01/02/2023",
    invoice: "INV-2023-005",
    amount: "€1200",
    status: "In attesa"
  }
];

const Billing = () => {
  const location = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState("Questo Mese");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBilling, setFilteredBilling] = useState(BillingData);

  // Verifica se siamo nella pagina di ricerca
  const isSearchPage = location.pathname === "/billing/search";

  // Imposta il focus sul campo di ricerca quando si accede alla pagina di ricerca
  useEffect(() => {
    if (isSearchPage) {
      const searchInput = document.getElementById('search-invoice');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isSearchPage]);

  // Filtra le fatture in base al termine di ricerca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredBilling(BillingData);
    } else {
      const filtered = BillingData.filter(bill =>
        bill.patient.toLowerCase().includes(term.toLowerCase()) ||
        bill.invoice.toLowerCase().includes(term.toLowerCase()) ||
        bill.amount.includes(term)
      );
      setFilteredBilling(filtered);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <h5 className="card-title">Gestione Fatturazione</h5>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <TextInput
                id="search-invoice"
                type="text"
                placeholder="Cerca fattura..."
                value={searchTerm}
                onChange={handleSearch}
                className="min-w-[250px]"
                icon={HiSearch}
              />
            </div>
            <Select
              id="period-filter"
              className="select-md"
              value={selectedPeriod}
              onChange={handleSelectChange}
              required
            >
              <option value="Questo Mese">Questo Mese</option>
              <option value="Mese Scorso">Mese Scorso</option>
              <option value="Questo Trimestre">Questo Trimestre</option>
              <option value="Quest'Anno">Quest'Anno</option>
            </Select>
            <Button color="primary" className="flex items-center gap-2" as={Link} to="/billing/new">
              <Icon icon="solar:add-circle-outline" height={20} />
              Nuova Fattura
            </Button>
          </div>
        </div>
        <SimpleBar className="max-h-[600px]">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Paziente</Table.HeadCell>
                <Table.HeadCell>Data</Table.HeadCell>
                <Table.HeadCell>Numero Fattura</Table.HeadCell>
                <Table.HeadCell>Importo</Table.HeadCell>
                <Table.HeadCell>Stato</Table.HeadCell>
                <Table.HeadCell>Azioni</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {filteredBilling.length > 0 ? (
                  filteredBilling.map((bill) => (
                  <Table.Row key={bill.id}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{bill.patient}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{bill.date}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{bill.invoice}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-sm">{bill.amount}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        className={
                          bill.status === "Pagato"
                            ? "bg-lightsuccess text-success"
                            : "bg-lightwarning text-warning"
                        }
                      >
                        {bill.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button color="primary" size="xs">
                          <Icon icon="solar:eye-outline" height={16} />
                        </Button>
                        <Button color="secondary" size="xs">
                          <Icon icon="solar:printer-outline" height={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-4">
                      <p className="text-gray-500">Nessuna fattura trovata</p>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default Billing;
