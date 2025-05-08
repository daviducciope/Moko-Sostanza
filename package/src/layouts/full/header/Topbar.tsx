import dentcareLogo from "/src/assets/images/logos/dental-crm-logo-basic.svg";
import Notification from "./notification";
import Profile from "./Profile";

const Topbar = () => {
  return (
    <div className="py-3 px-6 bg-primary z-40 sticky top-0 h-[62px] flex items-center">
      <div className="flex items-center justify-between w-full relative">
        <div className="flex items-center gap-12 z-10">
          <img src={dentcareLogo} alt="Dental CRM logo" className="h-8 w-auto brightness-0 invert" />
        </div>

        {/* Titolo centrato */}
        <div className="absolute left-0 right-0 mx-auto flex justify-center pointer-events-none">
          <h4 className="text-lg font-semibold text-white hidden lg:block">
            MOKO SOSTANZA Dental CRM - Gestionale per Dentisti
          </h4>
        </div>

        {/* Icone di notifica e profilo */}
        <div className="flex items-center gap-2 z-10">
          <Notification />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
