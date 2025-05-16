import { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { MedicalDevice, validateUDICode } from '../../services/DentalProcedureService';

interface MedicalDeviceFormProps {
  devices: MedicalDevice[];
  onDevicesChange: (devices: MedicalDevice[]) => void;
  readOnly?: boolean;
}

const MedicalDeviceForm = ({ devices, onDevicesChange, readOnly = false }: MedicalDeviceFormProps) => {
  const [newDevice, setNewDevice] = useState<Omit<MedicalDevice, 'id'>>({
    name: '',
    useDate: new Date().toISOString().split('T')[0],
    udiCode: ''
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    useDate?: string;
    udiCode?: string;
  }>({});
  
  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Resetta l'errore quando l'utente modifica il campo
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Valida il form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!newDevice.name.trim()) {
      newErrors.name = 'Il nome del dispositivo è obbligatorio';
    }
    
    if (!newDevice.useDate) {
      newErrors.useDate = 'La data di utilizzo è obbligatoria';
    }
    
    if (!newDevice.udiCode.trim()) {
      newErrors.udiCode = 'Il codice UDI è obbligatorio';
    } else if (!validateUDICode(newDevice.udiCode)) {
      newErrors.udiCode = 'Il codice UDI non è valido (formato: UDI-DI-123456789)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Aggiunge un nuovo dispositivo
  const handleAddDevice = () => {
    if (!validateForm()) return;
    
    const newDeviceWithId: MedicalDevice = {
      ...newDevice,
      id: Math.max(0, ...devices.map(d => d.id), 0) + 1
    };
    
    onDevicesChange([...devices, newDeviceWithId]);
    
    // Resetta il form
    setNewDevice({
      name: '',
      useDate: new Date().toISOString().split('T')[0],
      udiCode: ''
    });
  };
  
  // Rimuove un dispositivo
  const handleRemoveDevice = (deviceId: number) => {
    onDevicesChange(devices.filter(d => d.id !== deviceId));
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Dispositivi Medici Utilizzati
        <span className="text-red-500 ml-1">*</span>
        <span className="text-xs text-gray-500 ml-2">(Obbligatorio per interventi chirurgici)</span>
      </div>
      
      {devices.length > 0 && (
        <div className="space-y-2">
          {devices.map(device => (
            <div 
              key={device.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex-1">
                <div className="font-medium">{device.name}</div>
                <div className="text-sm text-gray-600">
                  <span className="mr-3">Data: {device.useDate}</span>
                  <span className="font-mono">UDI: {device.udiCode}</span>
                </div>
              </div>
              {!readOnly && (
                <Button
                  color="failure"
                  size="xs"
                  onClick={() => handleRemoveDevice(device.id)}
                  className="p-1"
                >
                  <Icon icon="solar:trash-bin-trash-outline" height={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {!readOnly && (
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <div className="text-sm font-medium mb-3">Aggiungi Dispositivo Medico</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="name" 
                  value="Nome/Tipo Prodotto" 
                  className="flex items-center"
                >
                  <span>Nome/Tipo Prodotto</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <TextInput
                id="name"
                name="name"
                value={newDevice.name}
                onChange={handleChange}
                placeholder="Es. Pinza chirurgica"
                color={errors.name ? 'failure' : undefined}
                helperText={errors.name}
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="useDate" 
                  value="Data Utilizzo" 
                  className="flex items-center"
                >
                  <span>Data Utilizzo</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <TextInput
                id="useDate"
                name="useDate"
                type="date"
                value={newDevice.useDate}
                onChange={handleChange}
                color={errors.useDate ? 'failure' : undefined}
                helperText={errors.useDate}
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="udiCode" 
                  value="Codice UDI" 
                  className="flex items-center"
                >
                  <span>Codice UDI</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <TextInput
                id="udiCode"
                name="udiCode"
                value={newDevice.udiCode}
                onChange={handleChange}
                placeholder="UDI-DI-123456789"
                color={errors.udiCode ? 'failure' : undefined}
                helperText={errors.udiCode}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              color="primary"
              size="sm"
              onClick={handleAddDevice}
              className="flex items-center gap-1"
            >
              <Icon icon="solar:add-circle-outline" height={18} />
              Aggiungi Dispositivo
            </Button>
          </div>
        </div>
      )}
      
      {devices.length === 0 && !readOnly && (
        <div className="text-sm text-gray-500 italic">
          Nessun dispositivo medico registrato. Aggiungi almeno un dispositivo per gli interventi chirurgici.
        </div>
      )}
    </div>
  );
};

export default MedicalDeviceForm;
