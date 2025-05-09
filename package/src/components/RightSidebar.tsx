import { useState } from "react";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { useReminderStore, getRelativeDate } from "../services/ReminderService";
import ReminderModal from "./reminders/ReminderModal";

// Mock data per gli ultimi appuntamenti
const recentAppointments = [
  {
    id: 1,
    patient: "Mario Rossi",
    time: "14:30",
    date: "Oggi",
    treatment: "Pulizia dentale",
    status: "upcoming"
  },
  {
    id: 2,
    patient: "Laura Bianchi",
    time: "16:00",
    date: "Oggi",
    treatment: "Controllo",
    status: "upcoming"
  }
];

// Funzione per ottenere il colore dello status
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-success";
    case "cancelled":
      return "text-error";
    case "upcoming":
      return "text-primary";
    default:
      return "text-gray-500";
  }
};

const RightSidebar = () => {
  const navigate = useNavigate();
  const { getUpcomingReminders, toggleCompleted } = useReminderStore();
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  // Ottieni i promemoria imminenti
  const upcomingReminders = getUpcomingReminders(3);

  // Apri il modale per creare un nuovo promemoria
  const openReminderModal = () => {
    setIsReminderModalOpen(true);
  };

  // Chiudi il modale
  const closeReminderModal = () => {
    setIsReminderModalOpen(false);
  };

  // Gestisci il completamento di un promemoria
  const handleToggleCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompleted(id);
  };

  // Naviga alla pagina dei miei appuntamenti
  const navigateToAppointments = () => {
    navigate('/appointments');
  };

  // Naviga alla pagina del calendario e apri il modale dei promemoria
  const navigateToReminders = () => {
    navigate('/calendar');
    // Il modale dei promemoria verrà aperto dalla pagina del calendario
  };

  return (
    <aside className="right-sidebar w-[180px] h-[calc(100vh-62px)] bg-white dark:bg-darkgray shadow-md flex flex-col">
      {/* Sezione pulsanti fissa */}
      <div className="p-2 border-b">
        <div className="flex flex-col gap-1">
          {/* Pulsante Nuovo Appuntamento */}
          <Button
            as={Link}
            to="/appointments/new"
            color="primary"
            size="xs"
            className="w-full flex items-center gap-1 justify-center py-1"
          >
            <Icon icon="solar:calendar-add-bold" height={14} />
            <span className="text-xs">Nuovo Appuntamento</span>
          </Button>

          {/* Pulsante Aggiungi Promemoria */}
          <Button
            onClick={openReminderModal}
            color="light"
            size="xs"
            className="w-full flex items-center gap-1 justify-center py-1"
          >
            <Icon icon="solar:bell-add-bold" height={14} />
            <span className="text-xs">Aggiungi Promemoria</span>
          </Button>

          {/* Pulsante Pazienti */}
          <Button
            as={Link}
            to="/patients"
            color="light"
            size="xs"
            className="w-full flex items-center gap-1 justify-center py-1"
          >
            <Icon icon="solar:users-group-rounded-line-duotone" height={14} />
            <span className="text-xs">Pazienti</span>
          </Button>

          {/* Pulsante Trattamenti */}
          <Button
            as={Link}
            to="/treatments"
            color="light"
            size="xs"
            className="w-full flex items-center gap-1 justify-center py-1"
          >
            <Icon icon="solar:stethoscope-outline" height={14} />
            <span className="text-xs">Trattamenti</span>
          </Button>
        </div>
      </div>

      {/* Sezione centrale scrollabile */}
      <div className="flex-grow overflow-hidden">
        <SimpleBar className="h-full"
          style={{ maxHeight: 'calc(100% - 0px)' }}
        >
          <div className="p-2 flex flex-col gap-2">

        {/* Lista ultimi appuntamenti */}
        <div>
          <h6
            className="text-dark dark:text-white text-sm font-semibold mb-2 px-1 flex items-center cursor-pointer hover:text-primary"
            onClick={navigateToAppointments}
          >
            <Icon icon="solar:calendar-mark-line-duotone" className="mr-1" height={16} />
            Prossimi Appuntamenti
            <Icon icon="solar:arrow-right-linear" className="ml-auto" height={14} />
          </h6>
          <div className="space-y-2">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-2 bg-lightgray dark:bg-darkmuted rounded-lg hover:bg-lightprimary dark:hover:bg-primary/10 transition-colors cursor-pointer"
                onClick={navigateToAppointments}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-dark dark:text-white truncate">
                    {appointment.patient}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon
                      icon="solar:clock-circle-outline"
                      className={getStatusColor(appointment.status)}
                      height={12}
                    />
                    <span className="text-bodytext">
                      {appointment.date} - {appointment.time}
                    </span>
                  </div>
                  <span className="text-xs text-bodytext truncate">
                    {appointment.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista promemoria imminenti */}
        <div>
          <h6
            className="text-dark dark:text-white text-sm font-semibold mb-2 px-1 flex items-center cursor-pointer hover:text-primary"
            onClick={navigateToReminders}
          >
            <Icon icon="solar:bell-outline" className="mr-1" height={16} />
            Promemoria
            <Icon icon="solar:arrow-right-linear" className="ml-auto" height={14} />
          </h6>
          <div className="space-y-2">
            {upcomingReminders.length > 0 ? (
              upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="p-2 bg-lightgray dark:bg-darkmuted rounded-lg hover:bg-lightprimary dark:hover:bg-primary/10 transition-colors cursor-pointer"
                  onClick={navigateToReminders}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-dark dark:text-white truncate">
                        {reminder.title}
                      </span>
                      <button
                        onClick={(e) => handleToggleCompleted(reminder.id, e)}
                        className="text-gray-400 hover:text-success"
                      >
                        <Icon icon="solar:check-circle-outline" height={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Icon
                        icon="solar:clock-circle-outline"
                        className="text-warning"
                        height={12}
                      />
                      <span className="text-bodytext">
                        {getRelativeDate(reminder.date)} - {reminder.time}
                      </span>
                    </div>
                    <span className="text-xs text-bodytext truncate">
                      {reminder.text}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 text-center p-2">
                Nessun promemoria imminente
              </div>
            )}
          </div>
        </div>

          </div>
        </SimpleBar>
      </div>

      {/* Banner pubblicitari fissi */}
      <div className="p-2 border-t">
        <div className="space-y-2">
          <div className="bg-lightprimary dark:bg-primary/10 p-2 rounded-lg">
            <h6 className="text-primary text-xs font-semibold mb-1">Promozione</h6>
            <p className="text-xs text-dark/70 dark:text-white/70">
              Sconto del 20% sulla pulizia dentale!
            </p>
          </div>

          <div className="bg-lightsuccess dark:bg-success/10 p-2 rounded-lg">
            <h6 className="text-success text-xs font-semibold mb-1">Novità</h6>
            <p className="text-xs text-dark/70 dark:text-white/70">
              Ortodonzia invisibile disponibile
            </p>
          </div>
        </div>
      </div>

      {/* Modale per aggiungere/modificare promemoria */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={closeReminderModal}
      />
    </aside>
  );
};

export default RightSidebar;
