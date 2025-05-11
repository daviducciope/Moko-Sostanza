import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface TreatmentFormProps {
  isEdit?: boolean;
  treatmentData?: {
    id?: number;
    name: string;
    category: string;
    duration: number;
    price: number;
    description: string;
    materials?: string;
  };
}

const TreatmentForm = ({ isEdit = false, treatmentData }: TreatmentFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: treatmentData?.name || '',
    category: treatmentData?.category || 'Conservativa',
    duration: treatmentData?.duration || 30,
    price: treatmentData?.price || 0,
    description: treatmentData?.description || '',
    materials: treatmentData?.materials || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Qui andrebbe la logica per salvare il trattamento
    console.log('Dati trattamento:', formData);

    // Reindirizza alla lista trattamenti dopo il salvataggio
    navigate('/treatments');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome Trattamento" />
          </div>
          <TextInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Otturazione"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Categoria" />
          </div>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Conservativa">Conservativa</option>
            <option value="Endodonzia">Endodonzia</option>
            <option value="Chirurgia">Chirurgia</option>
            <option value="Implantologia">Implantologia</option>
            <option value="Ortodonzia">Ortodonzia</option>
            <option value="Protesi">Protesi</option>
            <option value="Igiene">Igiene</option>
            <option value="Estetica">Estetica</option>
            <option value="Altro">Altro</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="duration" value="Durata (minuti)" />
          </div>
          <TextInput
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            min={5}
            max={240}
            step={5}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Prezzo (€)" />
          </div>
          <TextInput
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Descrizione" />
        </div>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrizione dettagliata del trattamento..."
          rows={3}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="materials" value="Materiali necessari" />
        </div>
        <Textarea
          id="materials"
          name="materials"
          value={formData.materials}
          onChange={handleChange}
          placeholder="Elenco dei materiali necessari per il trattamento..."
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button color="light" onClick={() => navigate('/treatments')}>
          Annulla
        </Button>
        <Button type="submit" color="primary">
          {isEdit ? 'Aggiorna' : 'Salva'}
        </Button>
      </div>
    </form>
  );
};

export default TreatmentForm;
