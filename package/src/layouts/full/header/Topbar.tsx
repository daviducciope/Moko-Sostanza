import { Icon } from "@iconify/react/dist/iconify.js";
import dentcareLogo from "/src/assets/images/logos/dental-crm-logo-basic.svg";
import { Link } from "react-router";

const Topbar = () => {
  return (
    <div className="py-3 px-4 bg-primary z-40 sticky top-0">
      <div className="flex items-center lg:justify-between justify-center flex-wrap">
        <div className="flex items-center gap-12">
            <img src={dentcareLogo} alt="Dental CRM logo" className="h-8" />
            <div className="lg:flex items-center gap-3 hidden">
                <Link to="/appointments" className="flex items-center gap-1 text-white bg-transparent hover:bg-secondary py-2 px-3 rounded-md">
                    <Icon icon="tabler:calendar" className="shrink-0 text-[19px]" />
                    <h4 className="text-sm font-semibold leading-none text-white">Appuntamenti</h4>
                </Link>
                <Link to="/patients" className="flex items-center gap-1 text-white bg-transparent hover:bg-secondary py-2 px-3 rounded-md">
                    <Icon icon="tabler:users" className="shrink-0 text-[19px]" />
                    <h4 className="text-sm font-semibold leading-none text-white">Pazienti</h4>
                </Link>
                <Link to="/treatments" className="flex items-center gap-1 text-white bg-transparent hover:bg-secondary py-2 px-3 rounded-md">
                    <Icon icon="tabler:stethoscope" className="shrink-0 text-[19px]" />
                    <h4 className="text-sm font-semibold leading-none text-white">Trattamenti</h4>
                </Link>
            </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-y-0 gap-y-3 flex-wrap lg:mt-0 mt-2 justify-center">
            <h4 className="text-lg font-semibold text-white">Dental CRM - Gestionale per Dentisti</h4>
        </div>
      </div>
    </div>
  )
}

export default Topbar
