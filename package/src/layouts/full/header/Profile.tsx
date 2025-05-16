import { Button, Dropdown } from "flowbite-react";
import { Icon } from "@iconify/react";
import dentistIcon from "/src/assets/images/svgs/icon-dentist.svg";
import { Link, useLocation } from "react-router-dom";

/**
 * Componente Profile per la top bar
 * Mostra l'icona del dentista e gestisce il menu a tendina con le opzioni utente
 * L'icona è stata sostituita con un'immagine professionale più adatta a un gestionale per dentisti
 */
const Profile = () => {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');
  const profilePath = isClinic ? '/clinic/profile' : '/profile';
  const settingsPath = isClinic ? '/clinic/settings' : '/settings';

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-white rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-white group-hover/menu:text-primary border-2 border-white">
            <img
              src={dentistIcon}
              alt="Dentist profile"
              height="35"
              width="35"
              className="p-1"
            />
          </span>
        )}
      >
        <Dropdown.Item
          as={Link}
          to={profilePath}
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:user-circle-outline" height={20} />
          Il Mio Profilo
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to={settingsPath}
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:settings-outline" height={20} />
          Impostazioni
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to="/appointments"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:calendar-mark-line-duotone" height={20} />
          Appuntamenti
        </Dropdown.Item>
        <div className="p-3 pt-0">
          <Button as={Link} size={'sm'} to="/auth/login" className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none">Logout</Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
