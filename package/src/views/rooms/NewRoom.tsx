import { useState } from 'react';
import { Button, Label, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';

const NewRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    department: '',
    equipment: '',
    status: 'available'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrà la logica per salvare la stanza
    console.log('Dati stanza:', formData);
    navigate('/clinic/rooms');
  };

  // Dipartimenti di esempio
  const departments = [
    'Ortodonzia',
    'Chirurgia',
    'Igiene Dentale',
    'Implantologia'
  ];

  return (
    <PageContainer title="Nuova Stanza" description="Creazione di una nuova stanza">
      <div className="rounded-xl shadow-md bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="text-xl font-semibold text-gray-900">Nuova Stanza</h5>
            <Link to="/clinic/rooms" className="text-gray-500 hover:text-primary">
              <Icon icon="solar:arrow-left-linear" height={20} />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="mb-4">
              <Label htmlFor="number" value="Numero Stanza" />
              <TextInput
                id="number"
                name="number"
                type="text"
                required
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="department" value="Reparto" />
              <Select
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Seleziona un reparto</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <Label htmlFor="equipment" value="Attrezzatura" />
              <TextInput
                id="equipment"
                name="equipment"
                type="text"
                value={formData.equipment}
                onChange={handleChange}
                placeholder="Inserisci le attrezzature separate da virgola"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="status" value="Stato" />
              <Select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
              >
                <option value="available">Disponibile</option>
                <option value="occupied">Occupata</option>
                <option value="maintenance">In Manutenzione</option>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" color="primary">
              <Icon icon="solar:check-circle-bold" className="mr-2" height={20} />
              Salva
            </Button>
            <Button color="gray" as={Link} to="/clinic/rooms">
              Annulla
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default NewRoom;
