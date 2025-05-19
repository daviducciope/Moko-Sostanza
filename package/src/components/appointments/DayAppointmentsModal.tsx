import { Modal, Button, Badge } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  useAppointmentStore, 
  getStatusBadgeColor, 
  type Appointment,
  type Patient,
  type Doctor,
  type Treatment
} from '../../services/AppointmentService';

interface DayAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  onNewAppointment: (date: string) => void;
  onEditAppointment: (id: number) => void;
}

export default function DayAppointmentsModal({ 
  isOpen, 
  onClose, 
  date,
  onNewAppointment,
  onEditAppointment 
}: DayAppointmentsModalProps) {
  const { 
    appointments,
    patients,
    doctors,
    treatments,
    deleteAppointment 
  } = useAppointmentStore();

  const dayAppointments = appointments.filter(
    appointment => appointment.date === date
  );

  const getPatient = (patientId: number): Patient => {
    return patients.find(p => p.id === patientId) || { 
      id: patientId,
      name: 'Paziente non trovato',
      phone: '',
      email: ''
    };
  };

  const getDoctor = (doctorId: number): Doctor => {
    return doctors.find(d => d.id === doctorId) || {
      id: doctorId,
      name: 'Dottore non trovato',
      specialization: '',
      color: '#cccccc'
    };
  };

  const getTreatment = (treatmentId: number): Treatment => {
    return treatments.find(t => t.id === treatmentId) || {
      id: treatmentId,
      name: 'Trattamento non trovato',
      duration: 0,
      price: 0,
      category: ''
    };
  };

  const handleDeleteAppointment = (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo appuntamento?')) {
      deleteAppointment(id);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Header>
        Appuntamenti del {format(new Date(date), 'd MMMM yyyy', { locale: it })}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <Button color="primary" onClick={() => onNewAppointment(date)}>
            <Icon icon="solar:calendar-add-bold" className="mr-2 h-5 w-5" />
            Nuovo Appuntamento
          </Button>

          {dayAppointments.length === 0 ? (
            <div className="text-center text-gray-500">
              Nessun appuntamento per questa data
            </div>
          ) : (
            <div className="space-y-4">
              {dayAppointments.map((appointment) => {
                const patient = getPatient(appointment.patientId);
                const doctor = getDoctor(appointment.doctorId);
                const treatment = getTreatment(appointment.treatmentId);
                
                return (
                  <div
                    key={appointment.id}
                    className="mb-4 p-4 rounded-lg border"
                    style={{ borderLeftWidth: '4px', borderLeftColor: doctor.color }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{patient.name}</div>
                        <div className="text-gray-600">
                          {appointment.startTime} - {appointment.endTime} | {doctor.name}
                        </div>
                        <div className="mt-2">
                          <Badge color={getStatusBadgeColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <span className="ml-2 text-sm">{treatment.name}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => onEditAppointment(appointment.id)}
                        >
                          <Icon icon="solar:pen-2-outline" className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          color="failure"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          <Icon icon="solar:trash-bin-trash-outline" className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
