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

  // Funzione per stampare l'elenco delle fatture
  const handlePrintInvoiceList = () => {
    window.print();
  };

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h5 className="card-title">Gestione Fatturazione</h5>
            <div className="flex gap-2">
              <Button color="light" className="flex items-center gap-2 no-print" onClick={handlePrintInvoiceList}>
                <Icon icon="solar:printer-outline" height={20} />
                <span className="hidden sm:inline">Stampa Elenco</span>
                <span className="sm:hidden">Stampa</span>
              </Button>
              <Button color="primary" className="flex items-center gap-2" as={Link} to="/billing/new">
                <Icon icon="solar:add-circle-outline" height={20} />
                <span className="hidden sm:inline">Nuova Fattura</span>
                <span className="sm:hidden">Nuova</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 no-print">
            <div className="relative">
              <TextInput
                id="search-invoice"
                type="text"
                placeholder="Cerca fattura..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full"
                icon={HiSearch}
              />
            </div>
            <Select
              id="period-filter"
              className="w-full"
              value={selectedPeriod}
              onChange={handleSelectChange}
              required
            >
              <option value="Questo Mese">Questo Mese</option>
              <option value="Mese Scorso">Mese Scorso</option>
              <option value="Questo Trimestre">Questo Trimestre</option>
              <option value="Quest'Anno">Quest'Anno</option>
            </Select>
          </div>

          {/* Titolo per la stampa */}
          <div className="hidden print:block print:mb-4">
            <h2 className="text-2xl font-bold text-center">Elenco Fatture</h2>
            <p className="text-center text-gray-500 mt-2">
              Periodo: {selectedPeriod}
            </p>
            <p className="text-center text-gray-500 mt-1">
              Generato il {new Date().toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>

        {/* Stili per la stampa */}
        <style type="text/css" media="print">
          {`
            @media print {
              body * {
                visibility: visible;
              }
              .no-print {
                display: none !important;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              th {
                font-weight: bold;
                background-color: #f2f2f2;
              }
            }
          `}
        </style>
        <div className="overflow-x-auto">
          <Table hoverable className="table-auto w-full">
            <Table.Head>
              <Table.HeadCell className="p-4">Paziente</Table.HeadCell>
              <Table.HeadCell className="p-4">Data</Table.HeadCell>
              <Table.HeadCell className="p-4 hidden md:table-cell md:print:table-cell">Numero Fattura</Table.HeadCell>
              <Table.HeadCell className="p-4">Importo</Table.HeadCell>
              <Table.HeadCell className="p-4">Stato</Table.HeadCell>
              <Table.HeadCell className="p-4 no-print">Azioni</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {filteredBilling.length > 0 ? (
                filteredBilling.map((bill) => (
                <Table.Row key={bill.id}>
                  <Table.Cell className="p-4">
                    <div className="flex gap-2 items-center">
                      <div>
                        <h6 className="text-sm font-medium">{bill.patient}</h6>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="p-4">
                    <p className="text-sm">{bill.date}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4 hidden md:table-cell md:print:table-cell">
                    <p className="text-sm">{bill.invoice}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4">
                    <p className="text-sm">{bill.amount}</p>
                  </Table.Cell>
                  <Table.Cell className="p-4">
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
                  <Table.Cell className="p-4 no-print">
                    <div className="flex gap-2">
                      <Button color="primary" size="xs" as={Link} to={`/billing/invoices/${bill.id}`}>
                        <Icon icon="solar:eye-outline" height={16} />
                      </Button>
                      <Button
                        color="secondary"
                        size="xs"
                        onClick={() => {
                          window.open(`/billing/invoices/${bill.id}?print=true`, '_blank');
                        }}
                      >
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
      </div>
    </>
  );
};

export default Billing;
