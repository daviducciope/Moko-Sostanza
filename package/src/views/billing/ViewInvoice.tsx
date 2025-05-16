import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button, Card, Badge, Table, Tooltip } from 'flowbite-react';
import { Icon } from '@iconify/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

// Componente per il template di stampa della fattura
const InvoicePrintTemplate = ({ invoice }: { invoice: Invoice }) => {
  // Formatta un numero come valuta
  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace('.', ',');
  };

  return (
    <div id="print-template" className="p-8 max-w-4xl mx-auto bg-white text-black">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">FATTURA</h1>
        <p className="text-sm text-gray-600">MOKO SOSTANZA Dental CRM</p>
      </div>

      {/* Intestazione con dati principali */}
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Fattura #{invoice.invoiceNumber}</h2>
          <p><strong>Data emissione:</strong> {invoice.date}</p>
          <p><strong>Data scadenza:</strong> {invoice.dueDate}</p>
          <p><strong>Stato:</strong> {invoice.status}</p>
          <p><strong>Metodo di pagamento:</strong> {invoice.paymentMethod}</p>
        </div>
        <div className="text-right">
          <div className="inline-block border border-gray-300 rounded px-4 py-2 mb-2">
            <span className={invoice.status === "Pagato" ? "text-green-600 font-bold" : "text-orange-500 font-bold"}>
              {invoice.status}
            </span>
          </div>
          <p><strong>Paziente:</strong></p>
          <p className="font-bold text-lg">{invoice.patient}</p>
        </div>
      </div>

      {/* Note */}
      {invoice.notes && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Note</h3>
          <p>{invoice.notes}</p>
        </div>
      )}

      {/* Tabella voci fattura */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3 border-b pb-2">Voci Fattura</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Descrizione</th>
              <th className="border p-2 text-center">Quantità</th>
              <th className="border p-2 text-right">Prezzo Unitario (€)</th>
              <th className="border p-2 text-center">IVA (%)</th>
              <th className="border p-2 text-right">Totale (€)</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="border p-2 text-center">{item.tax}%</td>
                <td className="border p-2 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Riepilogo totali */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-t border-gray-300">
            <span className="font-bold">Totale:</span>
            <span className="font-bold">€ {formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Informazioni di pagamento e note legali */}
      <div className="mt-12 text-sm text-gray-600 border-t pt-4">
        <p className="mb-2">Si prega di effettuare il pagamento entro la data di scadenza indicata.</p>
        <p>Per qualsiasi domanda relativa a questa fattura, contattare l'amministrazione.</p>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>MOKO SOSTANZA Dental CRM - Gestionale per Dentisti</p>
        <p>Documento generato automaticamente - {new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </div>
  );
};

const ViewInvoice = () => {
  const { id } = useParams();
  const location = useLocation();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPrintTemplate, setShowPrintTemplate] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printTemplateRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

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
    setShowPrintTemplate(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintTemplate(false);
      }, 500);
    }, 300);
  };

  // Funzione per generare e scaricare il PDF della fattura
  const handleDownloadPDF = async () => {
    if (!invoice) {
      console.error('Nessuna fattura disponibile per generare il PDF');
      return;
    }

    // Mostra l'indicatore di caricamento
    setIsGeneratingPDF(true);

    try {
      // Assicuriamoci che il template PDF sia visibile
      if (!pdfTemplateRef.current) {
        console.error('Riferimento al template PDF non disponibile');
        setIsGeneratingPDF(false);
        return;
      }

      // Utilizziamo una versione semplificata di html2canvas + jsPDF
      const element = pdfTemplateRef.current;

      // Creiamo il canvas dall'elemento HTML
      const canvas = await html2canvas(element, {
        scale: 2, // Alta qualità
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Creiamo il documento PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Dimensioni A4 in mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Margini
      const margin = 10;

      // Dimensioni effettive dell'area di stampa
      const printWidth = pageWidth - (margin * 2);

      // Calcola le dimensioni dell'immagine nel PDF
      const imgWidth = printWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Aggiungiamo l'immagine al PDF
      // Utilizziamo un metodo più semplice per la suddivisione in pagine

      // Altezza massima per pagina
      const maxHeight = pageHeight - (margin * 2);

      // Numero di pagine necessarie
      const pageCount = Math.ceil(imgHeight / maxHeight);

      // Per ogni pagina
      for (let i = 0; i < pageCount; i++) {
        // Se non è la prima pagina, aggiungi una nuova pagina
        if (i > 0) {
          pdf.addPage();
        }

        // Calcola la posizione di inizio nel canvas
        const sourceY = (i * maxHeight / imgHeight) * canvas.height;

        // Calcola l'altezza della porzione da includere
        const sourceHeight = Math.min(
          canvas.height - sourceY,
          (maxHeight / imgHeight) * canvas.height
        );

        // Crea un canvas temporaneo per la porzione corrente
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = sourceHeight;

        // Disegna la porzione corrente sul canvas temporaneo
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, tempCanvas.width, tempCanvas.height
          );

          // Converti il canvas temporaneo in immagine
          const imgData = tempCanvas.toDataURL('image/jpeg', 1.0);

          // Aggiungi l'immagine al PDF
          pdf.addImage(
            imgData,
            'JPEG',
            margin,
            margin,
            printWidth,
            (sourceHeight * printWidth) / canvas.width
          );
        }
      }

      // Aggiungi metadati al PDF
      pdf.setProperties({
        title: `Fattura ${invoice.invoiceNumber}`,
        subject: 'Fattura',
        author: 'MOKO SOSTANZA Dental CRM',
        keywords: 'fattura, dentista',
        creator: 'MOKO SOSTANZA Dental CRM'
      });

      // Genera il nome del file
      const fileName = `Fattura_${invoice.invoiceNumber.replace(/\s+/g, '_')}.pdf`;

      // Scarica il PDF
      pdf.save(fileName);

    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
    } finally {
      // Nascondi l'indicatore di caricamento
      setIsGeneratingPDF(false);
    }
  };

  // Effetto per la stampa automatica
  useEffect(() => {
    if (!loading && invoice && shouldPrint) {
      // Piccolo ritardo per assicurarsi che il rendering sia completo
      const timer = setTimeout(() => {
        handlePrintInvoice();
      }, 800);

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
          <Tooltip content="Stampa la fattura">
            <Button color="light" onClick={handlePrintInvoice} className="flex items-center gap-2">
              <Icon icon="solar:printer-outline" height={20} />
              Stampa Fattura
            </Button>
          </Tooltip>
          <Tooltip content="Scarica la fattura in formato PDF">
            <Button
              color="light"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                  Generazione PDF...
                </>
              ) : (
                <>
                  <Icon icon="solar:file-download-outline" height={20} />
                  Scarica PDF
                </>
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      <style type="text/css" media="print">
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-template, #print-template * {
              visibility: visible;
            }
            #print-template {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              font-size: 12pt;
              line-height: 1.3;
            }
            table {
              page-break-inside: avoid;
              font-size: 10pt;
            }
            table tr {
              page-break-inside: avoid;
            }
            p {
              orphans: 3;
              widows: 3;
            }
            h1, h2, h3, h4 {
              page-break-after: avoid;
            }
            @page {
              size: A4;
              margin: 15mm;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Template di stampa (nascosto normalmente, visibile solo durante la stampa) */}
      {showPrintTemplate && (
        <div className="fixed top-0 left-0 w-full h-0 overflow-hidden print:h-auto print:overflow-visible">
          <div ref={printTemplateRef} className="bg-white">
            {invoice && <InvoicePrintTemplate invoice={invoice} />}
          </div>
        </div>
      )}

      {/* Template di stampa nascosto ma renderizzato per la generazione PDF */}
      <div className="fixed top-0 left-0 w-full opacity-0 pointer-events-none" style={{ zIndex: -9999 }}>
        <div id="pdf-template" ref={pdfTemplateRef} className="bg-white p-0 m-0">
          {invoice && <InvoicePrintTemplate invoice={invoice} />}
        </div>
      </div>

      <div className="print:hidden" id="invoice-content">
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
