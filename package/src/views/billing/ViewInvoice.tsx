import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import { Button, Card, Badge, Table } from 'flowbite-react';
import { Icon } from '@iconify/react';

// Interfaccia per i dati della fattura
interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface Invoice {
  id: number;
  patient: string;
  date: string;
  dueDate: string;
  invoiceNumber: string;
  paymentMethod: string;
  notes: string;
  status: string;
  items: InvoiceItem[];
  total: number;
}

const ViewInvoice = () => {
  const { id } = useParams();
  const location = useLocation();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se è richiesta la stampa automatica
  const shouldPrint = new URLSearchParams(location.search).get('print') === 'true';

  // Simula il caricamento dei dati della fattura
  useEffect(() => {
    // In un'applicazione reale, qui ci sarebbe una chiamata API
    // per ottenere i dati della fattura con l'ID specificato
    setTimeout(() => {
      // Dati di esempio
      const mockInvoice: Invoice = {
        id: Number(id),
        patient: "Mario Rossi",
        date: "15/05/2023",
        dueDate: "15/06/2023",
        invoiceNumber: "INV-2023-001",
        paymentMethod: "Carta di Credito",
        notes: "Pagamento per trattamenti dentali eseguiti il 10/05/2023",
        status: "Pagato",
        items: [
          {
            id: 1,
            description: "Visita odontoiatrica",
            quantity: 1,
            unitPrice: 80,
            tax: 22,
            total: 97.60
          },
          {
            id: 2,
            description: "Otturazione",
            quantity: 2,
            unitPrice: 50,
            tax: 22,
            total: 122.00
          }
        ],
        total: 219.60
      };

      setInvoice(mockInvoice);
      setLoading(false);
    }, 500);
  }, [id]);

  // Funzione per stampare la fattura
  const handlePrintInvoice = () => {
    window.print();
  };

  // Effetto per la stampa automatica
  useEffect(() => {
    if (!loading && invoice && shouldPrint) {
      // Piccolo ritardo per assicurarsi che il rendering sia completo
      const timer = setTimeout(() => {
        handlePrintInvoice();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, invoice, shouldPrint]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center p-6">
        <h5 className="text-xl font-bold mb-2">Fattura non trovata</h5>
        <p className="mb-4">La fattura richiesta non è stata trovata nel sistema.</p>
        <Button color="primary" as={Link} to="/billing/invoices">
          Torna all'elenco fatture
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6 no-print">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Dettagli Fattura</h5>
          <Link to="/billing/invoices" className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'elenco fatture</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button color="light" onClick={handlePrintInvoice} className="flex items-center gap-2">
            <Icon icon="solar:printer-outline" height={20} />
            Stampa Fattura
          </Button>
        </div>
      </div>

      <style type="text/css" media="print">
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoice-content, #invoice-content * {
              visibility: visible;
            }
            #invoice-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="print:block" id="invoice-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Intestazione fattura */}
          <Card className="col-span-1">
            <div className="flex flex-col">
              <h5 className="text-lg font-bold mb-4">Informazioni Fattura</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Numero Fattura</p>
                  <p className="font-medium">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stato</p>
                  <Badge
                    className={
                      invoice.status === "Pagato"
                        ? "bg-lightsuccess text-success"
                        : "bg-lightwarning text-warning"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data Emissione</p>
                  <p className="font-medium">{invoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data Scadenza</p>
                  <p className="font-medium">{invoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Metodo di Pagamento</p>
                  <p className="font-medium">{invoice.paymentMethod}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Informazioni paziente */}
          <Card className="col-span-1">
            <div className="flex flex-col">
              <h5 className="text-lg font-bold mb-4">Informazioni Paziente</h5>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Paziente</p>
                <p className="font-medium text-lg">{invoice.patient}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Note</p>
                <p className="font-medium">{invoice.notes || 'Nessuna nota'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Dettagli voci fattura */}
        <Card className="mb-6">
          <h5 className="text-lg font-bold mb-4">Voci Fattura</h5>
          <Table>
            <Table.Head>
              <Table.HeadCell>Descrizione</Table.HeadCell>
              <Table.HeadCell>Quantità</Table.HeadCell>
              <Table.HeadCell>Prezzo Unitario (€)</Table.HeadCell>
              <Table.HeadCell>IVA (%)</Table.HeadCell>
              <Table.HeadCell>Totale (€)</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {invoice.items.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{item.unitPrice.toFixed(2)}</Table.Cell>
                  <Table.Cell>{item.tax}%</Table.Cell>
                  <Table.Cell>{item.total.toFixed(2)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex justify-end mt-4">
            <div className="w-64">
              <div className="flex justify-between py-2 border-t">
                <span className="font-medium">Totale:</span>
                <span className="font-bold">€ {invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewInvoice;
