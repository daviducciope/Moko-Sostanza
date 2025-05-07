import { useState, useEffect } from "react";
import { Button, Badge, Tooltip } from "flowbite-react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import {
  useAppointmentStore,
  getAppointmentTitle,
  getAppointmentColor
} from "../../services/AppointmentService";
import AppointmentModal from "../../components/appointments/AppointmentModal";
import DayAppointmentsModal from "../../components/appointments/DayAppointmentsModal";

// Componente principale del calendario
const Calendar = () => {
  const { appointments, doctors } = useAppointmentStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day" | "list">("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Funzione per ottenere il nome del mese e l'anno
  const getMonthYearHeader = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return currentDate.toLocaleDateString('it-IT', options).toUpperCase();
  };

  // Funzione per navigare al mese precedente
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Funzione per navigare al mese successivo
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Funzione per tornare alla data odierna
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Funzione per generare i giorni del mese
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Primo giorno del mese
    const firstDay = new Date(year, month, 1);
    // Ultimo giorno del mese
    const lastDay = new Date(year, month + 1, 0);

    // Giorno della settimana del primo giorno (0 = domenica, 1 = lunedì, ecc.)
    const firstDayOfWeek = firstDay.getDay();
    // Numero di giorni nel mese
    const daysInMonth = lastDay.getDate();

    // Giorni del mese precedente da mostrare
    const prevMonthDays = [];
    // Se il primo giorno non è domenica, mostra i giorni del mese precedente
    if (firstDayOfWeek !== 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthDaysCount = prevMonth.getDate();

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push({
          date: new Date(year, month - 1, prevMonthDaysCount - i),
          isCurrentMonth: false
        });
      }
    }

    // Giorni del mese corrente
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // Giorni del mese successivo da mostrare
    const nextMonthDays = [];
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = 42 - totalDaysShown; // 6 righe x 7 giorni = 42 celle

    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    // Combina tutti i giorni
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Funzione per formattare la data in formato YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Funzione per ottenere gli appuntamenti di un giorno specifico
  const getAppointmentsForDay = (date: Date) => {
    const dateStr = formatDate(date);
    return appointments.filter(appointment => appointment.date === dateStr);
  };

  // Funzione per aprire il modale di creazione appuntamento
  const openNewAppointmentModal = (date: Date, time?: string) => {
    setSelectedAppointment(null);
    setSelectedDate(formatDate(date));
    setSelectedTime(time || "09:00");
    setIsModalOpen(true);
  };

  // Funzione per aprire il modale di modifica appuntamento
  const openEditAppointmentModal = (appointmentId: number) => {
    setSelectedAppointment(appointmentId);
    setSelectedDate(null);
    setSelectedTime(null);
    setIsModalOpen(true);
  };

  // Funzione per chiudere il modale di creazione/modifica appuntamento
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Funzione per aprire il modale degli appuntamenti giornalieri
  const openDayAppointmentsModal = (date: Date) => {
    setSelectedDay(date);
    setIsDayModalOpen(true);
  };

  // Funzione per chiudere il modale degli appuntamenti giornalieri
  const closeDayModal = () => {
    setIsDayModalOpen(false);
    setSelectedDay(null);
  };

  // Genera i giorni da visualizzare
  const days = generateDays();

  // Giorni della settimana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  // Ottieni l'appuntamento selezionato
  const selectedAppointmentData = selectedAppointment !== null
    ? appointments.find(a => a.id === selectedAppointment)
    : undefined;

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Calendario Appuntamenti</h1>
          <div className="flex items-center space-x-2">
            <Button color="primary" onClick={() => openNewAppointmentModal(new Date())}>
              + Nuovo Appuntamento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar del calendario */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <Button.Group>
                  <Button color="primary" onClick={prevMonth}>
                    <Icon icon="solar:arrow-left-linear" />
                  </Button>
                  <Button color="primary" onClick={goToToday}>
                    Oggi
                  </Button>
                  <Button color="primary" onClick={nextMonth}>
                    <Icon icon="solar:arrow-right-linear" />
                  </Button>
                </Button.Group>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Clicca su un giorno per aggiungere un appuntamento
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Dottori</h3>
                <div className="space-y-2">
                  {doctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: doctor.color }}
                      ></div>
                      <span>{doctor.name} - {doctor.specialization}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Stato Appuntamenti</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
                    <span>Confermato</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-yellow-500"></div>
                    <span>In attesa</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-red-500"></div>
                    <span>Cancellato</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-gray-500"></div>
                    <span>Completato</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendario principale */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">{getMonthYearHeader()}</h2>
                <div className="flex space-x-1">
                  <Button.Group>
                    <Button color={view === "month" ? "primary" : "light"} onClick={() => setView("month")}>
                      Mese
                    </Button>
                    <Button color={view === "week" ? "primary" : "light"} onClick={() => setView("week")}>
                      Settimana
                    </Button>
                    <Button color={view === "day" ? "primary" : "light"} onClick={() => setView("day")}>
                      Giorno
                    </Button>
                    <Button color={view === "list" ? "primary" : "light"} onClick={() => setView("list")}>
                      Lista
                    </Button>
                  </Button.Group>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {/* Intestazioni dei giorni della settimana */}
                  {weekDays.map((day, index) => (
                    <div key={index} className="bg-white p-2 text-center font-semibold">
                      {day}
                    </div>
                  ))}

                  {/* Celle dei giorni */}
                  {days.map((day, index) => {
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    const dayAppointments = getAppointmentsForDay(day.date);

                    return (
                      <div
                        key={index}
                        className={`bg-white border p-1 min-h-[120px] relative ${
                          !day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''
                        } ${isToday ? 'bg-blue-50' : ''} cursor-pointer`}
                        onClick={() => openNewAppointmentModal(day.date)}
                      >
                        {/* Badge per il numero di appuntamenti */}
                        {day.isCurrentMonth && dayAppointments.length > 0 && (
                          <div className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {dayAppointments.length}
                          </div>
                        )}
                        <div className="flex justify-between items-start">
                          <span className={`inline-block w-6 h-6 text-center ${
                            isToday ? 'bg-primary text-white rounded-full' : ''
                          }`}>
                            {day.date.getDate()}
                          </span>

                          {/* Pulsante per visualizzare tutti gli appuntamenti */}
                          {day.isCurrentMonth && dayAppointments.length > 0 && (
                            <button
                              className="text-xs text-primary hover:text-primary-dark"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDayAppointmentsModal(day.date);
                              }}
                            >
                              <Icon icon="solar:list-outline" width={16} />
                            </button>
                          )}
                        </div>

                        {/* Appuntamenti del giorno */}
                        <div className="mt-1 space-y-0.5 max-h-[90px] overflow-hidden">
                          {dayAppointments.length > 0 && (
                            <>
                              {/* Mostra i primi 3 appuntamenti */}
                              {dayAppointments.slice(0, 3).map((appointment) => {
                                const title = getAppointmentTitle(appointment);
                                const color = getAppointmentColor(appointment);

                                return (
                                  <div
                                    key={appointment.id}
                                    className={`py-0.5 px-1 text-xs rounded truncate text-white flex items-center`}
                                    style={{ backgroundColor: color }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditAppointmentModal(appointment.id);
                                    }}
                                  >
                                    <Tooltip content={`${appointment.startTime} - ${appointment.endTime}: ${title}`}>
                                      <div className="flex items-center w-full">
                                        <span className="font-bold mr-1">{appointment.startTime}</span>
                                        <span className="truncate">{title}</span>
                                      </div>
                                    </Tooltip>
                                  </div>
                                );
                              })}

                              {/* Mostra un indicatore per gli appuntamenti aggiuntivi */}
                              {dayAppointments.length > 3 && (
                                <div
                                  className="py-0.5 px-1 text-xs rounded text-center bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Apriamo il modale con tutti gli appuntamenti del giorno
                                    openDayAppointmentsModal(day.date);
                                  }}
                                >
                                  <Tooltip content={`Altri ${dayAppointments.length - 3} appuntamenti`}>
                                    <div>+ {dayAppointments.length - 3} altri</div>
                                  </Tooltip>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modale per la creazione/modifica degli appuntamenti */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        appointment={selectedAppointmentData}
        selectedDate={selectedDate || undefined}
        selectedTime={selectedTime || undefined}
      />

      {/* Modale per visualizzare tutti gli appuntamenti di un giorno */}
      {selectedDay && (
        <DayAppointmentsModal
          isOpen={isDayModalOpen}
          onClose={closeDayModal}
          date={selectedDay}
          onNewAppointment={openNewAppointmentModal}
          onEditAppointment={openEditAppointmentModal}
        />
      )}
    </div>
  );
};

export default Calendar;
