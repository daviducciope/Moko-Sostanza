import { useState, useEffect } from 'react';
import { Modal, Button, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  useDentalProcedureStore,
  DentalProcedure,
  SurgicalProcedure,
  NonSurgicalProcedure,
  MedicalDevice,
  ProcedureType
} from '../../services/DentalProcedureService';
import TeethDiagram from './TeethDiagram';
import MedicalDeviceForm from './MedicalDeviceForm';

interface DentalProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
  procedure?: DentalProcedure;
}

const DentalProcedureModal = ({ isOpen, onClose, patientId, procedure }: DentalProcedureModalProps) => {
  const { addProcedure, updateProcedure } = useDentalProcedureStore();
  
  // Stato base del form
  const [procedureType, setProcedureType] = useState<ProcedureType>('non-surgical');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [createdBy, setCreatedBy] = useState('');
  
  // Stato per interventi chirurgici
  const [surgicalType, setSurgicalType] = useState('');
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [medicalDevices, setMedicalDevices] = useState<MedicalDevice[]>([]);
  
  // Stato per interventi non chirurgici
  const [description, setDescription] = useState('');
  
  // Stato per la validazione
  const [errors, setErrors] = useState<{
    date?: string;
    createdBy?: string;
    surgicalType?: string;
    selectedTeeth?: string;
    medicalDevices?: string;
    description?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inizializza il form quando si apre il modale o cambia la procedura
  useEffect(() => {
    if (procedure) {
      // Modifica di una procedura esistente
      setProcedureType(procedure.type);
      setDate(procedure.date);
      setCreatedBy(procedure.createdBy);
      
      if (procedure.type === 'surgical') {
        setSurgicalType(procedure.procedureType);
        setSelectedTeeth(procedure.teethInvolved);
        setMedicalDevices(procedure.medicalDevices);
      } else {
        setDescription(procedure.description);
      }
    } else {
      // Nuova procedura
      setProcedureType('non-surgical');
      setDate(new Date().toISOString().split('T')[0]);
      setCreatedBy('');
      setSurgicalType('');
      setSelectedTeeth([]);
      setMedicalDevices([]);
      setDescription('');
    }
    
    setErrors({});
    setIsSubmitting(false);
  }, [procedure, isOpen]);
  
  // Gestisce il cambio del tipo di procedura
  const handleProcedureTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProcedureType(e.target.value as ProcedureType);
  };
  
  // Valida il form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!date) {
      newErrors.date = 'La data è obbligatoria';
    }
    
    if (!createdBy.trim()) {
      newErrors.createdBy = 'Il nome del medico è obbligatorio';
    }
    
    if (procedureType === 'surgical') {
      if (!surgicalType.trim()) {
        newErrors.surgicalType = 'Il tipo di intervento è obbligatorio';
      }
      
      if (selectedTeeth.length === 0) {
        newErrors.selectedTeeth = 'Seleziona almeno un dente';
      }
      
      if (medicalDevices.length === 0) {
        newErrors.medicalDevices = 'Aggiungi almeno un dispositivo medico';
      }
    } else {
      if (!description.trim()) {
        newErrors.description = 'La descrizione è obbligatoria';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Gestisce l'invio del form
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (procedureType === 'surgical') {
        const surgicalProcedure: Omit<SurgicalProcedure, 'id' | 'createdAt'> = {
          patientId,
          date,
          type: 'surgical',
          procedureType: surgicalType,
          teethInvolved: selectedTeeth,
          medicalDevices,
          createdBy
        };
        
        if (procedure) {
          updateProcedure(procedure.id, surgicalProcedure);
        } else {
          addProcedure(surgicalProcedure);
        }
      } else {
        const nonSurgicalProcedure: Omit<NonSurgicalProcedure, 'id' | 'createdAt'> = {
          patientId,
          date,
          type: 'non-surgical',
          description,
          createdBy
        };
        
        if (procedure) {
          updateProcedure(procedure.id, nonSurgicalProcedure);
        } else {
          addProcedure(nonSurgicalProcedure);
        }
      }
      
      onClose();
    } catch (error) {
      console.error('Errore durante il salvataggio dell\'intervento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Header>
        {procedure ? 'Modifica Intervento' : 'Nuovo Intervento'}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="procedureType" 
                  value="Tipo di Intervento" 
                  className="flex items-center"
                >
                  <span>Tipo di Intervento</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <Select
                id="procedureType"
                value={procedureType}
                onChange={handleProcedureTypeChange}
                required
              >
                <option value="non-surgical">Non Chirurgico</option>
                <option value="surgical">Chirurgico</option>
              </Select>
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="date" 
                  value="Data Intervento" 
                  className="flex items-center"
                >
                  <span>Data Intervento</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <TextInput
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                color={errors.date ? 'failure' : undefined}
                helperText={errors.date}
                required
              />
            </div>
            
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="createdBy" 
                  value="Medico" 
                  className="flex items-center"
                >
                  <span>Medico</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <TextInput
                id="createdBy"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                placeholder="Dr. Rossi"
                color={errors.createdBy ? 'failure' : undefined}
                helperText={errors.createdBy}
                required
              />
            </div>
          </div>
          
          {procedureType === 'surgical' ? (
            <>
              <div>
                <div className="mb-2 block">
                  <Label 
                    htmlFor="surgicalType" 
                    value="Tipo di Intervento Chirurgico" 
                    className="flex items-center"
                  >
                    <span>Tipo di Intervento Chirurgico</span>
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                <TextInput
                  id="surgicalType"
                  value={surgicalType}
                  onChange={(e) => setSurgicalType(e.target.value)}
                  placeholder="Es. Estrazione dentale"
                  color={errors.surgicalType ? 'failure' : undefined}
                  helperText={errors.surgicalType}
                  required
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label 
                    htmlFor="teethInvolved" 
                    value="Denti Coinvolti" 
                    className="flex items-center"
                  >
                    <span>Denti Coinvolti</span>
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                <TeethDiagram
                  selectedTeeth={selectedTeeth}
                  onTeethChange={setSelectedTeeth}
                />
                {errors.selectedTeeth && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.selectedTeeth}
                  </p>
                )}
              </div>
              
              <div>
                <MedicalDeviceForm
                  devices={medicalDevices}
                  onDevicesChange={setMedicalDevices}
                />
                {errors.medicalDevices && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.medicalDevices}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="mb-2 block">
                <Label 
                  htmlFor="description" 
                  value="Descrizione Intervento" 
                  className="flex items-center"
                >
                  <span>Descrizione Intervento</span>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrivi l'intervento non chirurgico..."
                rows={5}
                color={errors.description ? 'failure' : undefined}
                helperText={errors.description}
                required
              />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="light" onClick={onClose}>
          Annulla
        </Button>
        <Button 
          color="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Salvataggio...
            </>
          ) : (
            procedure ? 'Aggiorna' : 'Salva'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DentalProcedureModal;
