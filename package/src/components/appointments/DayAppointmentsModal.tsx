import { useState } from 'react';
import { Modal, Button, Badge } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  useAppointmentStore, 
  Appointment,
  getAppointmentTitle,
  getAppointmentColor
} from '../../services/AppointmentService';

interface DayAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onNewAppointment: (date: Date) => void;
  onEditAppointment: (appointmentId: number) => void;
}

const DayAppointmentsModal = ({ 
  isOpen, 
  onClose, 
  date, 
  onNewAppointment,
  onEditAppointment
}: DayAppointmentsModalProps) => {
  const { 
    appointments, 
    getPatientById, 
    getDoctorById, 
    getTreatmentById,
    deleteAppointment
  } = useAppointmentStore();

  // Formatta la data in formato YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Formatta la data in formato leggibile
  const formatReadableDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('it-IT', options);
  };

  // Ottieni gli appuntamenti per il giorno selezionato
  const dayAppointments = appointments.filter(
    appointment => appointment.date === formatDate(date)
  );

  // Ordina gli appuntamenti per ora
  const sortedAppointments = [...dayAppointments].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  // Funzione per ottenere il colore dello stato
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confermato':
        return "success";
      case 'in attesa':
        return "warning";
      case 'cancellato':
        return "failure";
      case 'completato':
        return "gray";
      default:
        return "info";
    }
  };

  // Funzione per formattare lo stato con la prima lettera maiuscola
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Gestisce l'eliminazione di un appuntamento
  const handleDeleteAppointment = (appointmentId: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo appuntamento?')) {
      deleteAppointment(appointmentId);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Header>
        Appuntamenti del {formatReadableDate(date)}
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {sortedAppointments.length} appuntamenti in programma
          </h3>
          <Button color="primary" onClick={() => onNewAppointment(date)}>
            <Icon icon="solar:add-circle-outline" className="mr-2" />
            Nuovo Appuntamento
          </Button>
        </div>

        {sortedAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nessun appuntamento programmato per questa data.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map(appointment => {
              const patient = getPatientById(appointment.patientId);
              const doctor = getDoctorById(appointment.doctorId);
              const treatment = getTreatmentById(appointment.treatmentId);
              
              if (!patient || !doctor || !treatment) return null;
              
              return (
                <div 
                  key={appointment.id} 
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                  style={{ borderLeftWidth: '4px', borderLeftColor: getAppointmentColor(appointment) }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg">{patient.name}</div>
                      <div className="text-sm text-gray-600">
                        {appointment.startTime} - {appointment.endTime} | {doctor.name}
                      </div>
                      <div className="mt-1">
                        <Badge color={getStatusBadgeColor(appointment.status)}>
                          {formatStatus(appointment.status)}
                        </Badge>
                        <span className="ml-2 text-sm">{treatment.name}</span>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <Icon icon="solar:notes-outline" className="inline-block mr-1" />
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        color="primary" 
                        size="xs"
                        onClick={() => onEditAppointment(appointment.id)}
                      >
                        <Icon icon="solar:pen-outline" />
                      </Button>
                      <Button 
                        color="failure" 
                        size="xs"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <Icon icon="solar:trash-bin-trash-outline" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DayAppointmentsModal;
