import { Icon } from "@iconify/react";
import { Link } from "react-router";
import InvoiceForm from "../../components/billing/InvoiceForm";

const NewInvoice = () => {
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="card-title">Nuova Fattura</h5>
            <Link to="/billing/invoices" className="text-gray-500 hover:text-primary">
              <Icon icon="solar:arrow-left-linear" height={20} />
              <span className="sr-only">Torna all'elenco fatture</span>
            </Link>
          </div>
        </div>
        
        <InvoiceForm />
      </div>
    </>
  );
};

export default NewInvoice;
