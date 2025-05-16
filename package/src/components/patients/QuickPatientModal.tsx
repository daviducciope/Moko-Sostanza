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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" value="Nome e Cognome *" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mario Rossi"
                required
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
            />
            <p className="mt-1 text-xs text-gray-500">
              Questi sono i campi minimi richiesti. Potrai completare gli altri dati in seguito.
            </p>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="light" onClick={onClose}>
          Annulla
        </Button>
        <Button 
          color="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Salvataggio...
            </>
          ) : 'Salva e Seleziona'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickPatientModal;
