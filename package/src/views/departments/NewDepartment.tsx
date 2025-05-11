import { useState } from 'react';
import { Button, Label, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';

const NewDepartment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: '',
    status: 'active'
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
    // Qui andrà la logica per salvare il reparto
    console.log('Dati reparto:', formData);
    navigate('/clinic/departments');
  };

  return (
    <PageContainer title="Nuovo Reparto" description="Creazione di un nuovo reparto">
      <div className="rounded-xl shadow-md bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="text-xl font-semibold text-gray-900">Nuovo Reparto</h5>
            <Link to="/clinic/departments" className="text-gray-500 hover:text-primary">
              <Icon icon="solar:arrow-left-linear" height={20} />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="mb-4">
              <Label htmlFor="name" value="Nome Reparto" />
              <TextInput
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="head" value="Responsabile" />
              <TextInput
                id="head"
                name="head"
                type="text"
                required
                value={formData.head}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description" value="Descrizione" />
              <TextInput
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
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
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" color="primary">
              <Icon icon="solar:check-circle-bold" className="mr-2" height={20} />
              Salva
            </Button>
            <Button color="gray" as={Link} to="/clinic/departments">
              Annulla
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default NewDepartment;
