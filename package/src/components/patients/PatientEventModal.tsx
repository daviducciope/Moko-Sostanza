import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Label, TextInput, Select, Textarea, FileInput } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  usePatientEventStore, 
  PatientEvent, 
  Attachment,
  getEventTypeLabel
} from '../../services/PatientEventService';

interface PatientEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
  event?: PatientEvent;
}

const PatientEventModal = ({ isOpen, onClose, patientId, event }: PatientEventModalProps) => {
  const { addEvent, updateEvent } = usePatientEventStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'visita' as PatientEvent['type'],
    title: '',
    description: '',
    createdBy: ''
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inizializza il form quando si apre il modale
  useEffect(() => {
    if (event) {
      // Modifica di un evento esistente
      setFormData({
        date: event.date,
        time: event.time,
        type: event.type,
        title: event.title,
        description: event.description,
        createdBy: event.createdBy
      });
      setUploadedFiles(event.attachments);
    } else {
      // Nuovo evento
      const today = new Date().toISOString().split('T')[0];
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setFormData({
        date: today,
        time: currentTime,
        type: 'visita',
        title: '',
        description: '',
        createdBy: 'Dr. Bianchi' // In un'app reale, questo sarebbe l'utente corrente
      });
      setUploadedFiles([]);
    }
    setFiles([]);
    setIsSubmitting(false);
  }, [event, isOpen]);
  
  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gestisce l'upload dei file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };
  
  // Rimuove un file dalla lista di quelli da caricare
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Rimuove un allegato già caricato
  const removeUploadedFile = (id: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };
  
  // Simula il caricamento di un file
  const uploadFile = (file: File): Attachment => {
    // In un'app reale, qui ci sarebbe la logica per caricare il file su un server
    // e ottenere un URL o un percorso
    return {
      id: Math.floor(Math.random() * 10000),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file), // Crea un URL temporaneo per il file
      uploadDate: new Date().toISOString().split('T')[0]
    };
  };
  
  // Gestisce l'invio del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simula il caricamento dei file
      const newAttachments = await Promise.all(files.map(file => uploadFile(file)));
      
      // Combina gli allegati esistenti con quelli nuovi
      const allAttachments = [...uploadedFiles, ...newAttachments];
      
      const eventData = {
        patientId,
        ...formData,
        attachments: allAttachments
      };
      
      if (event) {
        // Aggiorna un evento esistente
        updateEvent(event.id, eventData);
      } else {
        // Crea un nuovo evento
        addEvent(eventData);
      }
      
      onClose();
    } catch (error) {
      console.error('Errore durante il salvataggio dell\'evento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        {event ? 'Modifica Evento' : 'Nuovo Evento'}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" value="Data" />
              <TextInput
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="time" value="Ora" />
              <TextInput
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" value="Tipo di evento" />
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="visita">{getEventTypeLabel('visita')}</option>
                <option value="prescrizione">{getEventTypeLabel('prescrizione')}</option>
                <option value="analisi">{getEventTypeLabel('analisi')}</option>
                <option value="nota">{getEventTypeLabel('nota')}</option>
                <option value="altro">{getEventTypeLabel('altro')}</option>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="createdBy" value="Creato da" />
              <TextInput
                id="createdBy"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="title" value="Titolo" />
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Inserisci un titolo per l'evento"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description" value="Descrizione" />
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Inserisci una descrizione dettagliata"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="attachments" value="Allegati" />
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                id="attachments"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <Button
                color="light"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Icon icon="solar:upload-outline" height={20} />
                Carica file
              </Button>
            </div>
            
            {/* Lista dei file da caricare */}
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                <Label value="File selezionati" />
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:file-outline" height={20} />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        color="failure"
                        size="xs"
                        onClick={() => removeFile(index)}
                        className="p-1"
                      >
                        <Icon icon="solar:trash-bin-trash-outline" height={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Lista degli allegati già caricati */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <Label value="Allegati esistenti" />
                <ul className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <li key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:file-check-outline" height={20} />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <Button
                        color="failure"
                        size="xs"
                        onClick={() => removeUploadedFile(file.id)}
                        className="p-1"
                      >
                        <Icon icon="solar:trash-bin-trash-outline" height={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
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
            event ? 'Aggiorna' : 'Salva'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientEventModal;
