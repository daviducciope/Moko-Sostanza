import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

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
  return (
    <aside className="fixed right-0 top-[90px] w-[180px] h-[calc(100vh-90px)] bg-white dark:bg-darkgray shadow-md">
      <div className="p-3 flex flex-col gap-3">
        {/* Pulsante Nuovo Appuntamento */}
        <Button
          as={Link}
          to="/appointments/new"
          color="primary"
          size="sm"
          className="w-full flex items-center gap-2 justify-center py-1.5"
        >
          <Icon icon="solar:calendar-add-bold" height={18} />
          <span className="text-sm">Nuovo Appuntamento</span>
        </Button>

        {/* Lista ultimi appuntamenti */}
        <div>
          <h6 className="text-dark dark:text-white text-sm font-semibold mb-2 px-1">
            Prossimi Appuntamenti
          </h6>
          <div className="space-y-2">
            {recentAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="p-2 bg-lightgray dark:bg-darkmuted rounded-lg hover:bg-lightprimary dark:hover:bg-primary/10 transition-colors cursor-pointer"
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

        {/* Banner pubblicitari */}
        <div className="space-y-2">
          <div className="bg-lightprimary dark:bg-primary/10 p-3 rounded-lg">
            <h6 className="text-primary text-sm font-semibold mb-1">Promozione</h6>
            <p className="text-xs text-dark/70 dark:text-white/70">
              Sconto del 20% sulla pulizia dentale!
            </p>
          </div>

          <div className="bg-lightsuccess dark:bg-success/10 p-3 rounded-lg">
            <h6 className="text-success text-sm font-semibold mb-1">Novità</h6>
            <p className="text-xs text-dark/70 dark:text-white/70">
              Ortodonzia invisibile disponibile
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;