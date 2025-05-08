import { Icon } from "@iconify/react/dist/iconify.js";
import dentcareLogo from "/src/assets/images/logos/dental-crm-logo-basic.svg";
import { Link } from "react-router";
import Notification from "./notification";
import Profile from "./Profile";

const Topbar = () => {
  return (
    <div className="py-3 px-4 bg-primary z-40 sticky top-0">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-12">
          <img src={dentcareLogo} alt="Dental CRM logo" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold text-white mr-4">Dental CRM - Gestionale per Dentisti</h4>
          
          {/* Icone di notifica e profilo */}
          <div className="flex items-center gap-2">
            <Notification />
            <Profile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
