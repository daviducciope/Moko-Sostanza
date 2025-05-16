import { useState, useRef } from 'react';
import { Card, Button, Select, Table, Badge, Tooltip } from 'flowbite-react';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Dati di esempio per i grafici e le tabelle
const monthlyRevenue = [
  { month: 'Gen', amount: 12500 },
  { month: 'Feb', amount: 14200 },
  { month: 'Mar', amount: 15800 },
  { month: 'Apr', amount: 16300 },
  { month: 'Mag', amount: 18500 },
  { month: 'Giu', amount: 17200 },
  { month: 'Lug', amount: 16800 },
  { month: 'Ago', amount: 12100 },
  { month: 'Set', amount: 15600 },
  { month: 'Ott', amount: 17300 },
  { month: 'Nov', amount: 18900 },
  { month: 'Dic', amount: 19500 }
];

const treatmentRevenue = [
  { treatment: 'Conservativa', amount: 45000, percentage: 25 },
  { treatment: 'Endodonzia', amount: 32000, percentage: 18 },
  { treatment: 'Chirurgia', amount: 28000, percentage: 16 },
  { treatment: 'Implantologia', amount: 38000, percentage: 21 },
  { treatment: 'Ortodonzia', amount: 22000, percentage: 12 },
  { treatment: 'Igiene', amount: 15000, percentage: 8 }
];

const topPatients = [
  { id: 1, name: 'Mario Rossi', totalSpent: 3850, visits: 12 },
  { id: 2, name: 'Giulia Bianchi', totalSpent: 3200, visits: 8 },
  { id: 3, name: 'Luca Verdi', totalSpent: 2950, visits: 7 },
  { id: 4, name: 'Sofia Neri', totalSpent: 2800, visits: 9 },
  { id: 5, name: 'Marco Gialli', totalSpent: 2600, visits: 6 }
];

const recentInvoices = [
  { id: 1, patient: 'Mario Rossi', date: '15/11/2023', amount: 350, status: 'Pagato' },
  { id: 2, patient: 'Giulia Bianchi', date: '12/11/2023', amount: 480, status: 'Pagato' },
  { id: 3, patient: 'Luca Verdi', date: '10/11/2023', amount: 220, status: 'In attesa' },
  { id: 4, patient: 'Sofia Neri', date: '05/11/2023', amount: 650, status: 'Pagato' },
  { id: 5, patient: 'Marco Gialli', date: '01/11/2023', amount: 180, status: 'In attesa' }
];

const expenseCategories = [
  { category: 'Materiali', amount: 28000, percentage: 35 },
  { category: 'Stipendi', amount: 32000, percentage: 40 },
  { category: 'Affitto', amount: 12000, percentage: 15 },
  { category: 'Utenze', amount: 5000, percentage: 6 },
  { category: 'Altro', amount: 3000, percentage: 4 }
];

const Reports = () => {
  const [period, setPeriod] = useState('year');
  const [year, setYear] = useState('2023');
  const [showPrintTemplate, setShowPrintTemplate] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printTemplateRef = useRef<HTMLDivElement>(null);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  // Componente per il template di stampa del report
  const ReportPrintTemplate = () => {
    // Formatta un numero come valuta
    const formatCurrency = (value: number) => {
      return value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
    };

    return (
      <div id="print-template" className="p-8 max-w-4xl mx-auto bg-white text-black">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">REPORT FINANZIARIO {year}</h1>
          <p className="text-sm text-gray-600">MOKO SOSTANZA Dental CRM</p>
          <p className="text-sm text-gray-600 mt-2">
            Periodo: {period === 'month' ? 'Mese Corrente' : period === 'quarter' ? 'Trimestre Corrente' : 'Anno Completo'}
          </p>
          <p className="text-sm text-gray-600">Generato il {new Date().toLocaleDateString('it-IT')}</p>
        </div>

        {/* Riepilogo finanziario */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Riepilogo Finanziario</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Entrate Totali</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="border rounded p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Spese Totali</h3>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="border rounded p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Profitto</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(profit)}</p>
              <p className="text-sm">Margine: {profitPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Entrate per trattamento */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Entrate per Trattamento</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Trattamento</th>
                <th className="border p-2 text-right">Importo</th>
                <th className="border p-2 text-center">Percentuale</th>
              </tr>
            </thead>
            <tbody>
              {treatmentRevenue.map((treatment, index) => (
                <tr key={index}>
                  <td className="border p-2">{treatment.treatment}</td>
                  <td className="border p-2 text-right">{formatCurrency(treatment.amount)}</td>
                  <td className="border p-2 text-center">{treatment.percentage}%</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border p-2">Totale</td>
                <td className="border p-2 text-right">{formatCurrency(totalRevenue)}</td>
                <td className="border p-2 text-center">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Spese per categoria */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Spese per Categoria</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Categoria</th>
                <th className="border p-2 text-right">Importo</th>
                <th className="border p-2 text-center">Percentuale</th>
              </tr>
            </thead>
            <tbody>
              {expenseCategories.map((category, index) => (
                <tr key={index}>
                  <td className="border p-2">{category.category}</td>
                  <td className="border p-2 text-right">{formatCurrency(category.amount)}</td>
                  <td className="border p-2 text-center">{category.percentage}%</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border p-2">Totale</td>
                <td className="border p-2 text-right">{formatCurrency(totalExpenses)}</td>
                <td className="border p-2 text-center">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top 5 pazienti */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Top 5 Pazienti</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Paziente</th>
                <th className="border p-2 text-right">Totale Speso</th>
                <th className="border p-2 text-center">Visite</th>
              </tr>
            </thead>
            <tbody>
              {topPatients.map((patient, index) => (
                <tr key={index}>
                  <td className="border p-2">{patient.name}</td>
                  <td className="border p-2 text-right">{formatCurrency(patient.totalSpent)}</td>
                  <td className="border p-2 text-center">{patient.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>MOKO SOSTANZA Dental CRM - Gestionale per Dentisti</p>
          <p>Documento generato automaticamente - {new Date().toLocaleDateString('it-IT')}</p>
        </div>
      </div>
    );
  };

  // Funzione per gestire la stampa del report
  const handlePrintReport = () => {
    setShowPrintTemplate(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setShowPrintTemplate(false);
      }, 500);
    }, 300);
  };

  // Funzione per generare e scaricare il PDF del report
  const handleDownloadPDF = async () => {
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
        title: `Report Finanziario ${year}`,
        subject: 'Report Finanziario',
        author: 'MOKO SOSTANZA Dental CRM',
        keywords: 'report, finanziario, dentista',
        creator: 'MOKO SOSTANZA Dental CRM'
      });

      // Genera il nome del file
      const fileName = `Report_Finanziario_${year}_${period}.pdf`;

      // Scarica il PDF
      pdf.save(fileName);

    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
    } finally {
      // Nascondi l'indicatore di caricamento
      setIsGeneratingPDF(false);
    }
  };

  // Calcola il totale delle entrate
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.amount, 0);

  // Calcola il totale delle spese
  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.amount, 0);

  // Calcola il profitto
  const profit = totalRevenue - totalExpenses;

  // Calcola la percentuale di profitto
  const profitPercentage = Math.round((profit / totalRevenue) * 100);

  // Funzione per generare il grafico a barre per le entrate mensili
  const renderRevenueChart = () => {
    const maxAmount = Math.max(...monthlyRevenue.map(month => month.amount));

    return (
      <div className="mt-4">
        <div className="flex items-end space-x-2 h-64">
          {monthlyRevenue.map((month, index) => {
            const height = (month.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${height}%` }}
                  title={`€${month.amount.toLocaleString()}`}
                ></div>
                <div className="text-xs mt-2">{month.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Funzione per generare il grafico a torta per le entrate per trattamento
  const renderTreatmentChart = () => {
    return (
      <div className="mt-4 flex justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Totale</div>
            </div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {treatmentRevenue.reduce((acc, treatment, index) => {
              const prevOffset = index === 0 ? 0 : acc.offset;
              const offset = prevOffset + treatment.percentage;

              // Calcola i punti per il segmento di torta
              const x1 = 50 + 40 * Math.cos(2 * Math.PI * prevOffset / 100);
              const y1 = 50 + 40 * Math.sin(2 * Math.PI * prevOffset / 100);
              const x2 = 50 + 40 * Math.cos(2 * Math.PI * offset / 100);
              const y2 = 50 + 40 * Math.sin(2 * Math.PI * offset / 100);

              // Determina se il segmento è più grande di un semicerchio
              const largeArcFlag = treatment.percentage > 50 ? 1 : 0;

              // Colori per i diversi segmenti
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

              acc.paths.push(
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth="0.5"
                />
              );

              return { paths: acc.paths, offset };
            }, { paths: [], offset: 0 }).paths}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <>
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
            <ReportPrintTemplate />
          </div>
        </div>
      )}

      {/* Template di stampa nascosto ma renderizzato per la generazione PDF */}
      <div className="fixed top-0 left-0 w-full opacity-0 pointer-events-none" style={{ zIndex: -9999 }}>
        <div id="pdf-template" ref={pdfTemplateRef} className="bg-white p-0 m-0">
          <ReportPrintTemplate />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Filtri e intestazione */}
        <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
          <div className="flex justify-between items-center">
            <h5 className="card-title">Reportistica Contabilità</h5>
            <div className="flex gap-3 no-print">
              <Select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="month">Mese Corrente</option>
                <option value="quarter">Trimestre Corrente</option>
                <option value="year">Anno Corrente</option>
              </Select>
              <Select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </Select>
              <Tooltip content="Stampa il report finanziario">
                <Button color="light" className="flex items-center gap-2" onClick={handlePrintReport}>
                  <Icon icon="solar:printer-outline" height={20} />
                  Stampa Report
                </Button>
              </Tooltip>
              <Tooltip content="Scarica il report finanziario in formato PDF">
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

          {/* Titolo visibile solo in stampa */}
          <div className="hidden print:block mt-4">
            <h2 className="text-2xl font-bold text-center">Report Finanziario {year}</h2>
            <p className="text-center text-gray-500 mt-2">
              {period === 'month' ? 'Mese Corrente' : period === 'quarter' ? 'Trimestre Corrente' : 'Anno Completo'}
            </p>
            <p className="text-center text-gray-500 mt-1">Generato il {new Date().toLocaleDateString('it-IT')}</p>
          </div>
        </div>

        {/* Riepilogo finanziario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">Entrate Totali</h6>
              <div className="text-3xl font-bold text-primary">€{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2">Anno {year}</div>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">Spese Totali</h6>
              <div className="text-3xl font-bold text-error">€{totalExpenses.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2">Anno {year}</div>
            </div>
          </Card>
          <Card className="col-span-1">
            <div className="flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-2">Profitto</h6>
              <div className="text-3xl font-bold text-success">€{profit.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2">Margine: {profitPercentage}%</div>
            </div>
          </Card>
        </div>

        {/* Grafici */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <h6 className="text-lg font-semibold mb-2">Entrate Mensili</h6>
            {renderRevenueChart()}
          </Card>
          <Card className="col-span-1">
            <h6 className="text-lg font-semibold mb-2">Entrate per Trattamento</h6>
            {renderTreatmentChart()}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {treatmentRevenue.map((treatment, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index % 6]
                    }}
                  ></div>
                  <span className="text-xs">{treatment.treatment} ({treatment.percentage}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tabelle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <h6 className="text-lg font-semibold mb-4">Top 5 Pazienti</h6>
            <SimpleBar className="max-h-[300px]">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Paziente</Table.HeadCell>
                  <Table.HeadCell>Totale Speso</Table.HeadCell>
                  <Table.HeadCell>Visite</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {topPatients.map((patient) => (
                    <Table.Row key={patient.id}>
                      <Table.Cell>{patient.name}</Table.Cell>
                      <Table.Cell>€{patient.totalSpent.toLocaleString()}</Table.Cell>
                      <Table.Cell>{patient.visits}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </SimpleBar>
          </Card>
          <Card className="col-span-1">
            <h6 className="text-lg font-semibold mb-4">Fatture Recenti</h6>
            <SimpleBar className="max-h-[300px]">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Paziente</Table.HeadCell>
                  <Table.HeadCell>Data</Table.HeadCell>
                  <Table.HeadCell>Importo</Table.HeadCell>
                  <Table.HeadCell>Stato</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {recentInvoices.map((invoice) => (
                    <Table.Row key={invoice.id}>
                      <Table.Cell>{invoice.patient}</Table.Cell>
                      <Table.Cell>{invoice.date}</Table.Cell>
                      <Table.Cell>€{invoice.amount.toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          className={
                            invoice.status === "Pagato"
                              ? "bg-lightsuccess text-success"
                              : "bg-lightwarning text-warning"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </SimpleBar>
          </Card>
        </div>

        {/* Spese per categoria */}
        <Card>
          <h6 className="text-lg font-semibold mb-4">Spese per Categoria</h6>
          <Table>
            <Table.Head>
              <Table.HeadCell>Categoria</Table.HeadCell>
              <Table.HeadCell>Importo</Table.HeadCell>
              <Table.HeadCell>Percentuale</Table.HeadCell>
              <Table.HeadCell>Distribuzione</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {expenseCategories.map((category, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{category.category}</Table.Cell>
                  <Table.Cell>€{category.amount.toLocaleString()}</Table.Cell>
                  <Table.Cell>{category.percentage}%</Table.Cell>
                  <Table.Cell className="w-1/3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-error h-2.5 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default Reports;
