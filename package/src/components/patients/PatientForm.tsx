import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

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
    fiscalCode?: string;
    medicalHistory?: string;
    isSmoker?: boolean;
    medications?: string;
    anamnesis?: string;
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
    udiCode: patientData?.udiCode || '',
    fiscalCode: patientData?.fiscalCode || '',
    medicalHistory: patientData?.medicalHistory || '',
    isSmoker: patientData?.isSmoker || false,
    medications: patientData?.medications || '',
    anamnesis: patientData?.anamnesis || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
            <Label htmlFor="fiscalCode" value="Codice Fiscale" />
          </div>
          <TextInput
            id="fiscalCode"
            name="fiscalCode"
            value={formData.fiscalCode}
            onChange={handleChange}
            placeholder="RSSMRA80E15F205X"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div className="flex items-center mt-8">
          <div className="flex items-center">
            <input
              id="isSmoker"
              name="isSmoker"
              type="checkbox"
              checked={formData.isSmoker}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
            />
            <Label htmlFor="isSmoker" value="Fumatore" className="ms-2" />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="medicalHistory" value="Patologie Pregresse" />
        </div>
        <Textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Inserisci eventuali patologie pregresse del paziente..."
          rows={3}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="medications" value="Farmaci" />
        </div>
        <Textarea
          id="medications"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          placeholder="Inserisci i farmaci che il paziente assume regolarmente..."
          rows={3}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="anamnesis" value="Anamnesi" />
        </div>
        <Textarea
          id="anamnesis"
          name="anamnesis"
          value={formData.anamnesis}
          onChange={handleChange}
          placeholder="Inserisci l'anamnesi completa del paziente..."
          rows={4}
        />
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
