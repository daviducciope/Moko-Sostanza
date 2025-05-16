import { useState } from 'react';
import { Card, Badge, Button, Accordion } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  DentalProcedure, 
  SurgicalProcedure,
  NonSurgicalProcedure,
  formatProcedureDate,
  getToothName
} from '../../services/DentalProcedureService';
import TeethDiagram from './TeethDiagram';
import MedicalDeviceForm from './MedicalDeviceForm';

interface DentalProcedureListProps {
  procedures: DentalProcedure[];
  onEditProcedure: (procedure: DentalProcedure) => void;
  onDeleteProcedure: (procedureId: number) => void;
}

const DentalProcedureList = ({ procedures, onEditProcedure, onDeleteProcedure }: DentalProcedureListProps) => {
  const [expandedProcedureId, setExpandedProcedureId] = useState<number | null>(null);
  
  // Gestisce l'espansione/collasso di una procedura
  const toggleProcedure = (procedureId: number) => {
    setExpandedProcedureId(expandedProcedureId === procedureId ? null : procedureId);
  };
  
  // Ottiene l'icona appropriata per il tipo di procedura
  const getProcedureIcon = (type: DentalProcedure['type']): string => {
    return type === 'surgical' 
      ? 'solar:scalpel-linear' 
      : 'solar:tooth-outline';
  };
  
  // Ottiene il colore appropriato per il tipo di procedura
  const getProcedureColor = (type: DentalProcedure['type']): string => {
    return type === 'surgical' 
      ? 'bg-lighterror text-error' 
      : 'bg-lightprimary text-primary';
  };
  
  // Ottiene l'etichetta per il tipo di procedura
  const getProcedureTypeLabel = (type: DentalProcedure['type']): string => {
    return type === 'surgical' ? 'Chirurgico' : 'Non Chirurgico';
  };
  
  // Renderizza il contenuto specifico per il tipo di procedura
  const renderProcedureContent = (procedure: DentalProcedure) => {
    if (procedure.type === 'surgical') {
      const surgicalProcedure = procedure as SurgicalProcedure;
      return (
        <>
          <div className="mb-4">
            <h6 className="text-sm font-medium mb-1">Tipo di Intervento</h6>
            <p className="text-sm">{surgicalProcedure.procedureType}</p>
          </div>
          
          <div className="mb-4">
            <h6 className="text-sm font-medium mb-2">Denti Coinvolti</h6>
            <TeethDiagram
              selectedTeeth={surgicalProcedure.teethInvolved}
              onTeethChange={() => {}}
              readOnly
            />
          </div>
          
          <div>
            <h6 className="text-sm font-medium mb-2">Dispositivi Medici Utilizzati</h6>
            <MedicalDeviceForm
              devices={surgicalProcedure.medicalDevices}
              onDevicesChange={() => {}}
              readOnly
            />
          </div>
        </>
      );
    } else {
      const nonSurgicalProcedure = procedure as NonSurgicalProcedure;
      return (
        <div>
          <h6 className="text-sm font-medium mb-1">Descrizione</h6>
          <p className="text-sm whitespace-pre-line">{nonSurgicalProcedure.description}</p>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-4">
      {procedures.length > 0 ? (
        procedures.map((procedure) => (
          <Card key={procedure.id} className="overflow-hidden">
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => toggleProcedure(procedure.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getProcedureColor(procedure.type)}`}>
                  <Icon icon={getProcedureIcon(procedure.type)} height={24} />
                </div>
                <div>
                  <h5 className="text-lg font-medium">
                    {procedure.type === 'surgical' 
                      ? (procedure as SurgicalProcedure).procedureType 
                      : 'Intervento non chirurgico'}
                  </h5>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatProcedureDate(procedure.date)}</span>
                    <span>•</span>
                    <Badge className={getProcedureColor(procedure.type)}>
                      {getProcedureTypeLabel(procedure.type)}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">Eseguito da: {procedure.createdBy}</p>
                </div>
              </div>
              <Icon 
                icon={expandedProcedureId === procedure.id ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"} 
                height={20} 
              />
            </div>
            
            {expandedProcedureId === procedure.id && (
              <div className="mt-4 pt-4 border-t">
                {renderProcedureContent(procedure)}
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    color="light"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProcedure(procedure);
                    }}
                    className="flex items-center gap-1"
                  >
                    <Icon icon="solar:pen-outline" height={16} />
                    Modifica
                  </Button>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProcedure(procedure.id);
                    }}
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
          <Icon icon="solar:tooth-outline" className="mx-auto mb-2" height={48} />
          <p className="text-gray-500">Nessun intervento registrato per questo paziente</p>
        </div>
      )}
    </div>
  );
};

export default DentalProcedureList;
