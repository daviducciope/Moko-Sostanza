import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import TreatmentForm from "../../components/treatments/TreatmentForm";

const NewTreatment = () => {
  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="card-title">Nuovo Trattamento</h5>
            <Link to="/treatments" className="text-gray-500 hover:text-primary">
              <Icon icon="solar:arrow-left-linear" height={20} />
              <span className="sr-only">Torna alla lista trattamenti</span>
            </Link>
          </div>
        </div>

        <TreatmentForm />
      </div>
    </>
  );
};

export default NewTreatment;
