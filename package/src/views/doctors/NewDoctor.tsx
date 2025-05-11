import { useState } from 'react';
import { Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Specializzazioni predefinite
const specializations = [
  'Odontoiatria generale',
  'Ortodonzia',
  'Chirurgia orale',
  'Endodonzia',
  'Implantologia',
  'Odontoiatria pediatrica',
  'Parodontologia',
  'Protesi dentaria',
  'Odontoiatria estetica',
  'Altro'
];

const NewDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determina se siamo nella sezione clinica o dentista
  const isClinic = location.pathname.startsWith('/clinic');

  // Costruisci i percorsi base in base alla sezione
  const basePath = isClinic ? '/clinic/doctors' : '/doctors';

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    birthDate: '',
    gender: '',
    licenseNumber: '',
    startDate: '',
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

    // Qui andrebbe la logica per salvare il dottore
    console.log('Dati dottore:', formData);

    // Reindirizza all'elenco dottori dopo il salvataggio
    navigate(basePath);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h5 className="card-title">Nuovo Dottore</h5>
          <Link to={basePath} className="text-gray-500 hover:text-primary">
            <Icon icon="solar:arrow-left-linear" height={20} />
            <span className="sr-only">Torna all'elenco dottori</span>
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
              placeholder="Es. Dr. Marco Rossi"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="specialization" value="Specializzazione" />
            </div>
            <Select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleziona specializzazione</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
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
              placeholder="Es. marco.rossi@example.com"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="licenseNumber" value="Numero di Licenza" />
            </div>
            <TextInput
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Es. 12345"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="startDate" value="Data di Inizio" />
            </div>
            <TextInput
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
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

export default NewDoctor;
