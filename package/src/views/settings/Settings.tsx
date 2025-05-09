import { Button, Card, Label, TextInput, Select, ToggleSwitch } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const Settings = () => {
  const location = useLocation();
  const isClinic = location.pathname.startsWith('/clinic');
  
  // Impostazioni generali
  const [generalSettings, setGeneralSettings] = useState({
    language: 'it',
    timezone: 'Europe/Rome',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'EUR'
  });

  // Impostazioni notifiche
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    systemUpdates: true
  });

  // Impostazioni privacy
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    allowAnalytics: true,
    showOnlineStatus: true
  });

  // Gestione dei cambiamenti nei form
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name: string, checked: boolean, settingType: 'notification' | 'privacy') => {
    if (settingType === 'notification') {
      setNotificationSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (settingType === 'privacy') {
      setPrivacySettings(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Impostazioni generali salvate:', generalSettings);
    // Qui andrà la logica per salvare le impostazioni generali
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Impostazioni notifiche salvate:', notificationSettings);
    // Qui andrà la logica per salvare le impostazioni delle notifiche
  };

  const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Impostazioni privacy salvate:', privacySettings);
    // Qui andrà la logica per salvare le impostazioni della privacy
  };

  return (
    <div className="space-y-6">
      {/* Card Impostazioni Generali */}
      <Card className="relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h5 className="text-xl font-bold">Impostazioni Generali</h5>
            <p className="text-sm text-gray-500">Gestisci le impostazioni generali dell'applicazione</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language" value="Lingua" />
                  <Select
                    id="language"
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                  >
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone" value="Fuso Orario" />
                  <Select
                    id="timezone"
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                  >
                    <option value="Europe/Rome">Europe/Rome (GMT+1)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dateFormat" value="Formato Data" />
                  <Select
                    id="dateFormat"
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralChange}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeFormat" value="Formato Ora" />
                  <Select
                    id="timeFormat"
                    name="timeFormat"
                    value={generalSettings.timeFormat}
                    onChange={handleGeneralChange}
                  >
                    <option value="24h">24 ore</option>
                    <option value="12h">12 ore (AM/PM)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency" value="Valuta" />
                  <Select
                    id="currency"
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                  >
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollaro USA ($)</option>
                    <option value="GBP">Sterlina (£)</option>
                    <option value="CHF">Franco Svizzero (CHF)</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button color="light">
              Annulla
            </Button>
            <Button type="submit" color="primary">
              Salva Modifiche
            </Button>
          </div>
        </form>
      </Card>

      {/* Card Notifiche */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h5 className="text-xl font-bold">Notifiche</h5>
            <p className="text-sm text-gray-500">Gestisci le tue preferenze di notifica</p>
          </div>
        </div>

        <form onSubmit={handleSaveNotifications}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" value="Notifiche Email" />
                <p className="text-sm text-gray-500">Ricevi notifiche via email</p>
              </div>
              <ToggleSwitch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={(checked) => handleToggleChange('emailNotifications', checked, 'notification')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" value="Notifiche SMS" />
                <p className="text-sm text-gray-500">Ricevi notifiche via SMS</p>
              </div>
              <ToggleSwitch
                id="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={(checked) => handleToggleChange('smsNotifications', checked, 'notification')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentReminders" value="Promemoria Appuntamenti" />
                <p className="text-sm text-gray-500">Ricevi promemoria per gli appuntamenti</p>
              </div>
              <ToggleSwitch
                id="appointmentReminders"
                checked={notificationSettings.appointmentReminders}
                onChange={(checked) => handleToggleChange('appointmentReminders', checked, 'notification')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" value="Email di Marketing" />
                <p className="text-sm text-gray-500">Ricevi email promozionali e newsletter</p>
              </div>
              <ToggleSwitch
                id="marketingEmails"
                checked={notificationSettings.marketingEmails}
                onChange={(checked) => handleToggleChange('marketingEmails', checked, 'notification')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemUpdates" value="Aggiornamenti di Sistema" />
                <p className="text-sm text-gray-500">Ricevi notifiche sugli aggiornamenti del sistema</p>
              </div>
              <ToggleSwitch
                id="systemUpdates"
                checked={notificationSettings.systemUpdates}
                onChange={(checked) => handleToggleChange('systemUpdates', checked, 'notification')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button color="light">
              Annulla
            </Button>
            <Button type="submit" color="primary">
              Salva Modifiche
            </Button>
          </div>
        </form>
      </Card>

      {/* Card Privacy */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h5 className="text-xl font-bold">Privacy</h5>
            <p className="text-sm text-gray-500">Gestisci le tue impostazioni sulla privacy</p>
          </div>
        </div>

        <form onSubmit={handleSavePrivacy}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shareData" value="Condivisione Dati" />
                <p className="text-sm text-gray-500">Consenti la condivisione dei dati anonimi per migliorare il servizio</p>
              </div>
              <ToggleSwitch
                id="shareData"
                checked={privacySettings.shareData}
                onChange={(checked) => handleToggleChange('shareData', checked, 'privacy')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowAnalytics" value="Analytics" />
                <p className="text-sm text-gray-500">Consenti l'utilizzo di analytics per migliorare l'esperienza utente</p>
              </div>
              <ToggleSwitch
                id="allowAnalytics"
                checked={privacySettings.allowAnalytics}
                onChange={(checked) => handleToggleChange('allowAnalytics', checked, 'privacy')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showOnlineStatus" value="Stato Online" />
                <p className="text-sm text-gray-500">Mostra il tuo stato online ad altri utenti</p>
              </div>
              <ToggleSwitch
                id="showOnlineStatus"
                checked={privacySettings.showOnlineStatus}
                onChange={(checked) => handleToggleChange('showOnlineStatus', checked, 'privacy')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button color="light">
              Annulla
            </Button>
            <Button type="submit" color="primary">
              Salva Modifiche
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
