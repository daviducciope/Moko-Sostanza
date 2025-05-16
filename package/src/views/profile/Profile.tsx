import { Button, Card, Label, TextInput, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente Profile per la visualizzazione e modifica del profilo utente
 * Implementa una modalità di visualizzazione e una modalità di modifica
 * Il pulsante "Modifica Profilo" attiva la modalità di modifica
 */
const Profile = () => {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');

  // Stato per gestire la modalità di modifica
  const [isEditMode, setIsEditMode] = useState(false);

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

  // Salva una copia dei dati originali per poter annullare le modifiche
  const [originalData, setOriginalData] = useState({...formData});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Attiva la modalità di modifica
  const enableEditMode = () => {
    setOriginalData({...formData}); // Salva i dati originali
    setIsEditMode(true);
  };

  // Annulla le modifiche e torna alla modalità di visualizzazione
  const cancelEdit = () => {
    setFormData({...originalData}); // Ripristina i dati originali
    setIsEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui andrà la logica per salvare i dati del profilo
    console.log('Dati profilo aggiornati:', formData);
    setIsEditMode(false); // Torna alla modalità di visualizzazione dopo il salvataggio
  };

  return (
    <div className="space-y-6">
      {/* Card Profilo Principale */}
      <Card className="relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-bold">Il Mio Profilo</h5>
          {!isEditMode ? (
            <Button
              color="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={enableEditMode}
            >
              <Icon icon="solar:pen-outline" />
              Modifica Profilo
            </Button>
          ) : (
            <div className="text-sm text-primary">Modalità modifica attiva</div>
          )}
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
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="phone" value="Telefono" />
                <TextInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" value="CAP" />
                  <TextInput
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
            disabled={!isEditMode}
          />
        </div>

        {isEditMode && (
          <div className="flex justify-end gap-4 mt-6">
            <Button color="light" onClick={cancelEdit}>
              Annulla
            </Button>
            <Button type="submit" color="primary" onClick={handleSubmit}>
              Salva Modifiche
            </Button>
          </div>
        )}
      </Card>

      {/* Card Sicurezza */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h5 className="text-xl font-bold">Sicurezza</h5>
            <p className="text-sm text-gray-500">Gestisci la sicurezza del tuo account</p>
          </div>
          {!isEditMode && (
            <Button
              color="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={enableEditMode}
            >
              <Icon icon="solar:pen-outline" />
              Modifica Password
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" value="Password Attuale" />
            <TextInput
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              disabled={!isEditMode}
            />
          </div>

          <div>
            <Label htmlFor="newPassword" value="Nuova Password" />
            <TextInput
              id="newPassword"
              type="password"
              placeholder="••••••••"
              disabled={!isEditMode}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" value="Conferma Password" />
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              disabled={!isEditMode}
            />
          </div>
        </div>

        {isEditMode && (
          <div className="flex justify-end gap-4 mt-6">
            <Button color="light" onClick={cancelEdit}>
              Annulla
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Aggiorna Password
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;