import { useState } from 'react';
import { Card, Badge, Button, Accordion } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  PatientEvent, 
  Attachment,
  formatEventDateTime, 
  getEventTypeIcon, 
  getEventTypeLabel, 
  getEventTypeColor,
  formatFileSize
} from '../../services/PatientEventService';

interface PatientEventListProps {
  events: PatientEvent[];
  onEditEvent: (event: PatientEvent) => void;
  onDeleteEvent: (eventId: number) => void;
}

const PatientEventList = ({ events, onEditEvent, onDeleteEvent }: PatientEventListProps) => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  
  // Gestisce l'espansione/collasso di un evento
  const toggleEvent = (eventId: number) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };
  
  // Gestisce il download di un allegato
  const handleDownload = (attachment: Attachment) => {
    // In un'app reale, qui ci sarebbe la logica per scaricare il file
    // Per ora, apriamo semplicemente l'URL in una nuova scheda
    window.open(attachment.url, '_blank');
  };
  
  // Ottiene l'icona appropriata per il tipo di file
  const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith('image/')) {
      return 'solar:gallery-outline';
    } else if (fileType === 'application/pdf') {
      return 'solar:file-pdf-outline';
    } else if (fileType.includes('word')) {
      return 'solar:file-text-outline';
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return 'solar:file-spreadsheet-outline';
    } else {
      return 'solar:file-outline';
    }
  };
  
  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => toggleEvent(event.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                  <Icon icon={getEventTypeIcon(event.type)} height={24} />
                </div>
                <div>
                  <h5 className="text-lg font-medium">{event.title}</h5>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatEventDateTime(event.date, event.time)}</span>
                    <span>•</span>
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">Creato da: {event.createdBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.attachments.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Icon icon="solar:paperclip-outline" height={16} />
                    <span>{event.attachments.length}</span>
                  </div>
                )}
                <Icon 
                  icon={expandedEventId === event.id ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"} 
                  height={20} 
                />
              </div>
            </div>
            
            {expandedEventId === event.id && (
              <div className="mt-4 pt-4 border-t">
                {event.description && (
                  <div className="mb-4">
                    <h6 className="text-sm font-medium mb-1">Descrizione</h6>
                    <p className="text-sm whitespace-pre-line">{event.description}</p>
                  </div>
                )}
                
                {event.attachments.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium mb-2">Allegati</h6>
                    <ul className="space-y-2">
                      {event.attachments.map((attachment) => (
                        <li 
                          key={attachment.id} 
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon={getFileIcon(attachment.type)} height={20} />
                            <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
                            <span className="text-xs text-gray-500">
                              ({formatFileSize(attachment.size)})
                            </span>
                          </div>
                          <Button
                            color="light"
                            size="xs"
                            onClick={() => handleDownload(attachment)}
                            className="p-1"
                          >
                            <Icon icon="solar:download-outline" height={16} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    color="light"
                    size="xs"
                    onClick={() => onEditEvent(event)}
                    className="flex items-center gap-1"
                  >
                    <Icon icon="solar:pen-outline" height={16} />
                    Modifica
                  </Button>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => onDeleteEvent(event.id)}
                    className="flex items-center gap-1"
                  >
                    <Icon icon="solar:trash-bin-trash-outline" height={16} />
                    Elimina
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <Icon icon="solar:notebook-outline" className="mx-auto mb-2" height={48} />
          <p className="text-gray-500">Nessun evento registrato per questo paziente</p>
        </div>
      )}
    </div>
  );
};

export default PatientEventList;
