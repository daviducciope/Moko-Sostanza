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
              className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-between cursor-pointer p-4"
              onClick={() => toggleEvent(event.id)}
            >
              <div className="flex items-start gap-3 flex-grow min-w-0">
                <div className={`p-2 rounded-lg flex-shrink-0 ${getEventTypeColor(event.type)}`}>
                  <Icon icon={getEventTypeIcon(event.type)} height={24} />
                </div>
                <div className="flex-grow min-w-0">
                  <h5 className="text-lg font-medium truncate">{event.title}</h5>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span className="whitespace-nowrap">{formatEventDateTime(event.date, event.time)}</span>
                    <span className="hidden sm:inline">•</span>
                    <Badge className={`${getEventTypeColor(event.type)} whitespace-nowrap`}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1 truncate">Creato da: {event.createdBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-start">
                {event.attachments.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Icon icon="solar:paperclip-outline" height={16} />
                    <span>{event.attachments.length}</span>
                  </div>
                )}
                <Icon 
                  icon={expandedEventId === event.id ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"} 
                  height={20} 
                  className="flex-shrink-0"
                />
              </div>
            </div>
            
            {expandedEventId === event.id && (
              <div className="mt-2 p-4 pt-0 border-t">
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
                          <div className="flex items-center gap-2 flex-grow min-w-0">
                            <Icon icon={getFileIcon(attachment.type)} height={20} className="flex-shrink-0" />
                            <span className="text-sm truncate">{attachment.name}</span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              ({formatFileSize(attachment.size)})
                            </span>
                          </div>
                          <Button
                            color="light"
                            size="xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(attachment);
                            }}
                            className="p-1 ml-2 flex-shrink-0"
                          >
                            <Icon icon="solar:download-outline" height={16} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                  <Button
                    color="light"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className="flex items-center justify-center gap-1 w-full sm:w-auto"
                  >
                    <Icon icon="solar:pen-outline" height={16} />
                    <span className="whitespace-nowrap">Modifica</span>
                  </Button>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="flex items-center justify-center gap-1 w-full sm:w-auto"
                  >
                    <Icon icon="solar:trash-bin-trash-outline" height={16} />
                    <span className="whitespace-nowrap">Elimina</span>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <Icon icon="solar:notebook-outline" className="mx-auto mb-2 text-gray-400" height={48} />
          <p className="text-gray-500">Nessun evento registrato per questo paziente</p>
        </div>
      )}
    </div>
  );
};

export default PatientEventList;
