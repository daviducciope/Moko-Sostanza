import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router';

interface PatientFormProps {
  isEdit?: boolean;
  patientData?: {
    id?: number;
    name: string;
    phone: string;
    email: string;
    birthdate: string;
    gender: string;
    address: string;
    notes: string;
    udiCode?: string;
  };
}

const PatientForm = ({ isEdit = false, patientData }: PatientFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: patientData?.name || '',
    phone: patientData?.phone || '',
    email: patientData?.email || '',
    birthdate: patientData?.birthdate || '',
    gender: patientData?.gender || 'M',
    address: patientData?.address || '',
    notes: patientData?.notes || '',
    udiCode: patientData?.udiCode || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Qui andrebbe la logica per salvare il paziente
    console.log('Dati paziente:', formData);

    // Reindirizza alla lista pazienti dopo il salvataggio
    navigate('/patients');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome e Cognome" />
          </div>
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
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Telefono" />
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mario.rossi@example.com"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="birthdate" value="Data di nascita" />
          </div>
          <TextInput
            id="birthdate"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender" value="Genere" />
          </div>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="M">Maschio</option>
            <option value="F">Femmina</option>
            <option value="A">Altro</option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="Indirizzo" />
          </div>
          <TextInput
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Via Roma 123, Milano"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="udiCode" value="Codice UDI" />
          </div>
          <TextInput
            id="udiCode"
            name="udiCode"
            value={formData.udiCode}
            onChange={handleChange}
            placeholder="IT-12345678"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="notes" value="Note" />
        </div>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Inserisci eventuali note sul paziente..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button color="light" onClick={() => navigate('/patients')}>
          Annulla
        </Button>
        <Button type="submit" color="primary">
          {isEdit ? 'Aggiorna' : 'Salva'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
