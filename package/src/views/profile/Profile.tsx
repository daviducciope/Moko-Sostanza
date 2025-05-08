import { Button, Card, Label, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const Profile = () => {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');
  
  const [formData, setFormData] = useState({
    name: 'Dr. Mario Rossi',
    email: 'mario.rossi@dentista.it',
    phone: '+39 123 456 7890',
    role: isClinic ? 'Amministratore Clinica' : 'Dentista',
    specialization: 'Ortodonzia',
    address: 'Via Roma 123',
    city: 'Milano',
    postalCode: '20100',
    license: 'ODNT123MI',
    bio: 'Specializzato in ortodonzia con oltre 15 anni di esperienza.'
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
    // Qui andrà la logica per salvare i dati del profilo
    console.log('Dati profilo aggiornati:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Card Profilo Principale */}
      <Card className="relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-bold">Il Mio Profilo</h5>
          <Button color="primary" size="sm" className="flex items-center gap-2">
            <Icon icon="solar:pen-outline" />
            Modifica Profilo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" value="Nome Completo" />
                <TextInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="phone" value="Telefono" />
                <TextInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="role" value="Ruolo" />
                <TextInput
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialization" value="Specializzazione" />
                <Select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                >
                  <option value="Ortodonzia">Ortodonzia</option>
                  <option value="Implantologia">Implantologia</option>
                  <option value="Endodonzia">Endodonzia</option>
                  <option value="Chirurgia">Chirurgia</option>
                  <option value="Generale">Generale</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="address" value="Indirizzo" />
                <TextInput
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" value="Città" />
                  <TextInput
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" value="CAP" />
                  <TextInput
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="license" value="Numero Iscrizione Albo" />
                <TextInput
                  id="license"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Label htmlFor="bio" value="Biografia" />
          <TextInput
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button color="light">
            Annulla
          </Button>
          <Button type="submit" color="primary" onClick={handleSubmit}>
            Salva Modifiche
          </Button>
        </div>
      </Card>

      {/* Card Sicurezza */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h5 className="text-xl font-bold">Sicurezza</h5>
            <p className="text-sm text-gray-500">Gestisci la sicurezza del tuo account</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" value="Password Attuale" />
            <TextInput
              id="currentPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="newPassword" value="Nuova Password" />
            <TextInput
              id="newPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" value="Conferma Password" />
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button color="light">
            Annulla
          </Button>
          <Button color="primary">
            Aggiorna Password
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;