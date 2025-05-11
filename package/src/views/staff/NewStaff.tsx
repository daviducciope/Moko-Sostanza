import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Ruoli predefiniti
const roles = [
  'Assistente dentale',
  'Receptionist',
  'Igienista dentale',
  'Amministratore',
  'Tecnico di laboratorio',
  'Infermiere',
  'Altro'
];

// Reparti predefiniti
const departments = [
  'Assistenza',
  'Amministrazione',
  'Igiene',
  'Laboratorio',
  'Accoglienza',
  'Altro'
];

const NewStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/staff' : '/staff';

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    birthDate: '',
    gender: '',
    department: '',
    hireDate: '',
    salary: '',
    notes: '',
    status: 'attivo'
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

    // Qui andrebbe la logica per salvare il dipendente
    console.log('Dati dipendente:', formData);

    // Reindirizza all'elenco del personale dopo il salvataggio
    navigate(basePath);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Nuovo Dipendente</h5>
          <Link to={basePath} className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'elenco del personale</span>
          </Link>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nome Completo" />
            </div>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Es. Maria Bianchi"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Ruolo" />
            </div>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleziona ruolo</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </Select>
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
              placeholder="Es. maria.bianchi@example.com"
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
              value={formData.phone}
              onChange={handleChange}
              placeholder="Es. +39 123 456 7890"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Indirizzo" />
            </div>
            <TextInput
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Es. Via Roma 123"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="city" value="Città" />
            </div>
            <TextInput
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Es. Milano"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="postalCode" value="CAP" />
            </div>
            <TextInput
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Es. 20100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="birthDate" value="Data di Nascita" />
            </div>
            <TextInput
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="gender" value="Genere" />
            </div>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>Seleziona genere</option>
              <option value="M">Maschile</option>
              <option value="F">Femminile</option>
              <option value="Altro">Altro</option>
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="status" value="Stato" />
            </div>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="attivo">Attivo</option>
              <option value="in ferie">In ferie</option>
              <option value="non disponibile">Non disponibile</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="department" value="Reparto" />
            </div>
            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleziona reparto</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="hireDate" value="Data di Assunzione" />
            </div>
            <TextInput
              id="hireDate"
              name="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="salary" value="Stipendio (€)" />
            </div>
            <TextInput
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Es. 1500"
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
            placeholder="Note aggiuntive..."
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button color="light" onClick={() => navigate(basePath)}>
            Annulla
          </Button>
          <Button type="submit" color="primary">
            Salva
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewStaff;
