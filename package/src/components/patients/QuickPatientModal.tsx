import { useState } from 'react';
import { Modal, Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useAppointmentStore } from '../../services/AppointmentService';

interface QuickPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: (patientId: number) => void;
}

const QuickPatientModal = ({ isOpen, onClose, onPatientAdded }: QuickPatientModalProps) => {
  const { addPatient } = useAppointmentStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthdate: new Date().toISOString().split('T')[0],
    gender: 'M',
    address: '',
    notes: '',
    udiCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aggiungi il nuovo paziente
      const newPatient = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      };
      
      // Aggiungi il paziente allo store e ottieni l'ID
      const newPatientId = addPatient(newPatient);
      
      // Resetta il form
      setFormData({
        name: '',
        phone: '',
        email: '',
        birthdate: new Date().toISOString().split('T')[0],
        gender: 'M',
        address: '',
        notes: '',
        udiCode: ''
      });
      
      // Notifica il componente padre
      onPatientAdded(newPatientId);
      
      // Chiudi il modale
      onClose();
    } catch (error) {
      console.error('Errore durante il salvataggio del paziente:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        Aggiungi Nuovo Paziente
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" value="Nome e Cognome *" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mario Rossi"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" value="Telefono *" />
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+39 333 1234567"
                required
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" value="Email *" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mario.rossi@example.com"
              required
              className="w-full"
            />
            <p className="mt-1 text-xs text-gray-500">
              Questi sono i campi minimi richiesti. Potrai completare gli altri dati in seguito.
            </p>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2">
        <Button 
          color="light" 
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Annulla
        </Button>
        <Button 
          color="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="whitespace-nowrap">Salvataggio...</span>
            </>
          ) : (
            <span className="whitespace-nowrap">Salva e Seleziona</span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickPatientModal;
