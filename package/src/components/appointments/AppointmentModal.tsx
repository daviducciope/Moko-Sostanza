import { useState, useEffect } from 'react';
import { Modal, Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useAppointmentStore, Appointment } from '../../services/AppointmentService';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
  selectedDate?: string;
  selectedTime?: string;
}

const AppointmentModal = ({ isOpen, onClose, appointment, selectedDate, selectedTime }: AppointmentModalProps) => {
  const { 
    patients, 
    doctors, 
    treatments, 
    addAppointment, 
    updateAppointment 
  } = useAppointmentStore();

  const [formData, setFormData] = useState({
    patientId: 0,
    doctorId: 0,
    treatmentId: 0,
    date: '',
    startTime: '',
    endTime: '',
    status: 'confermato' as Appointment['status'],
    notes: ''
  });

  // Calcola l'ora di fine in base al trattamento selezionato
  const calculateEndTime = (startTime: string, treatmentId: number) => {
    if (!startTime || !treatmentId) return '';

    const treatment = treatments.find(t => t.id === treatmentId);
    if (!treatment) return '';

    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + treatment.duration;
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
  };

  // Inizializza il form quando si apre il modale
  useEffect(() => {
    if (appointment) {
      // Modifica di un appuntamento esistente
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        treatmentId: appointment.treatmentId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        notes: appointment.notes || ''
      });
    } else {
      // Nuovo appuntamento
      setFormData({
        patientId: patients.length > 0 ? patients[0].id : 0,
        doctorId: doctors.length > 0 ? doctors[0].id : 0,
        treatmentId: treatments.length > 0 ? treatments[0].id : 0,
        date: selectedDate || new Date().toISOString().split('T')[0],
        startTime: selectedTime || '09:00',
        endTime: '',
        status: 'confermato',
        notes: ''
      });
    }
  }, [isOpen, appointment, selectedDate, selectedTime, patients, doctors, treatments]);

  // Aggiorna l'ora di fine quando cambia il trattamento o l'ora di inizio
  useEffect(() => {
    if (formData.treatmentId && formData.startTime) {
      const endTime = calculateEndTime(formData.startTime, formData.treatmentId);
      setFormData(prev => ({ ...prev, endTime }));
    }
  }, [formData.treatmentId, formData.startTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (appointment) {
      // Aggiorna un appuntamento esistente
      updateAppointment(appointment.id, formData);
    } else {
      // Crea un nuovo appuntamento
      addAppointment(formData);
    }
    
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        {appointment ? 'Modifica Appuntamento' : 'Nuovo Appuntamento'}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patientId" value="Paziente" />
            <Select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un paziente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <Label htmlFor="doctorId" value="Dottore" />
            <Select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un dottore</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <Label htmlFor="treatmentId" value="Trattamento" />
            <Select
              id="treatmentId"
              name="treatmentId"
              value={formData.treatmentId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un trattamento</option>
              {treatments.map(treatment => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name} ({treatment.duration} min - €{treatment.price})
                </option>
              ))}
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" value="Data" />
              <TextInput
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="startTime" value="Ora di inizio" />
              <TextInput
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endTime" value="Ora di fine (calcolata automaticamente)" />
              <TextInput
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                readOnly
              />
            </div>
            
            <div>
              <Label htmlFor="status" value="Stato" />
              <Select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="confermato">Confermato</option>
                <option value="in attesa">In attesa</option>
                <option value="cancellato">Cancellato</option>
                <option value="completato">Completato</option>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes" value="Note" />
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button color="light" onClick={onClose}>
              Annulla
            </Button>
            <Button type="submit" color="primary">
              {appointment ? 'Aggiorna' : 'Salva'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
