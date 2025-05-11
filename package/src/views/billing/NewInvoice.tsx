import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import InvoiceForm from "../../components/billing/InvoiceForm";
import { useState } from "react";

const NewInvoice = () => {
  // Funzione per gestire la stampa
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="card-title">Nuova Fattura</h5>
            <Link to="/billing/invoices" className="text-gray-500 hover:text-primary no-print">
              <Icon icon="solar:arrow-left-linear" height={20} />
              <span className="sr-only">Torna all'elenco fatture</span>
            </Link>
          </div>
          <div className="no-print">
            <Button color="light" onClick={handlePrint} className="flex items-center gap-2">
              <Icon icon="solar:printer-outline" height={20} />
              <span>Stampa</span>
            </Button>
          </div>
        </div>

        {/* Titolo per la stampa */}
        <div className="hidden print:block print:mb-6">
          <h2 className="text-2xl font-bold text-center">Nuova Fattura</h2>
          <p className="text-center text-gray-500 mt-2">
            Generata il {new Date().toLocaleDateString('it-IT')}
          </p>
        </div>

        <InvoiceForm />
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
            input, select, textarea {
              border: none !important;
              background: transparent !important;
              box-shadow: none !important;
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
            .rounded-xl {
              border-radius: 0 !important;
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default NewInvoice;
