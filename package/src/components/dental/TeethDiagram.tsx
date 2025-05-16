import { useState, useEffect } from 'react';
import { Tooltip } from 'flowbite-react';
import { Tooth, teethData } from '../../services/DentalProcedureService';

interface TeethDiagramProps {
  selectedTeeth: number[];
  onTeethChange: (selectedTeeth: number[]) => void;
  readOnly?: boolean;
}

const TeethDiagram = ({ selectedTeeth, onTeethChange, readOnly = false }: TeethDiagramProps) => {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);
  
  // Raggruppa i denti per posizione
  const upperRight = teethData.filter(tooth => tooth.position === 'upper-right');
  const upperLeft = teethData.filter(tooth => tooth.position === 'upper-left');
  const lowerLeft = teethData.filter(tooth => tooth.position === 'lower-left');
  const lowerRight = teethData.filter(tooth => tooth.position === 'lower-right');
  
  // Ordina i denti per numero
  upperRight.sort((a, b) => a.number - b.number);
  upperLeft.sort((a, b) => a.number - b.number);
  lowerLeft.sort((a, b) => b.number - a.number); // Ordine inverso per la visualizzazione
  lowerRight.sort((a, b) => b.number - a.number); // Ordine inverso per la visualizzazione
  
  // Gestisce il click su un dente
  const handleToothClick = (toothId: number) => {
    if (readOnly) return;
    
    const newSelectedTeeth = selectedTeeth.includes(toothId)
      ? selectedTeeth.filter(id => id !== toothId)
      : [...selectedTeeth, toothId];
    
    onTeethChange(newSelectedTeeth);
  };
  
  // Determina la classe CSS per un dente
  const getToothClass = (toothId: number) => {
    const baseClass = "tooth-shape";
    
    if (selectedTeeth.includes(toothId)) {
      return `${baseClass} selected`;
    }
    
    if (hoveredTooth === toothId) {
      return `${baseClass} hovered`;
    }
    
    return baseClass;
  };
  
  return (
    <div className="teeth-diagram">
      <style jsx>{`
        .teeth-diagram {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .teeth-row {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .tooth-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 2px;
          cursor: ${readOnly ? 'default' : 'pointer'};
        }
        
        .tooth-shape {
          width: 24px;
          height: 30px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          transition: all 0.2s ease;
        }
        
        .tooth-shape.selected {
          background-color: #3b82f6;
          color: white;
          border-color: #2563eb;
        }
        
        .tooth-shape.hovered:not(.selected) {
          background-color: #e5e7eb;
          border-color: #9ca3af;
        }
        
        .tooth-number {
          font-size: 9px;
          margin-top: 2px;
          color: #6b7280;
        }
        
        .diagram-section {
          margin-bottom: 10px;
        }
        
        .section-label {
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 5px;
        }
      `}</style>
      
      <div className="diagram-section">
        <div className="section-label">Arcata Superiore</div>
        <div className="teeth-row">
          {upperRight.map(tooth => (
            <Tooltip key={tooth.id} content={`${tooth.number} - ${tooth.name}`}>
              <div 
                className="tooth-container"
                onClick={() => handleToothClick(tooth.id)}
                onMouseEnter={() => setHoveredTooth(tooth.id)}
                onMouseLeave={() => setHoveredTooth(null)}
              >
                <div className={getToothClass(tooth.id)}>
                  {tooth.number}
                </div>
                <div className="tooth-number">{tooth.number}</div>
              </div>
            </Tooltip>
          ))}
          
          {upperLeft.map(tooth => (
            <Tooltip key={tooth.id} content={`${tooth.number} - ${tooth.name}`}>
              <div 
                className="tooth-container"
                onClick={() => handleToothClick(tooth.id)}
                onMouseEnter={() => setHoveredTooth(tooth.id)}
                onMouseLeave={() => setHoveredTooth(null)}
              >
                <div className={getToothClass(tooth.id)}>
                  {tooth.number}
                </div>
                <div className="tooth-number">{tooth.number}</div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      
      <div className="diagram-section">
        <div className="section-label">Arcata Inferiore</div>
        <div className="teeth-row">
          {lowerRight.map(tooth => (
            <Tooltip key={tooth.id} content={`${tooth.number} - ${tooth.name}`}>
              <div 
                className="tooth-container"
                onClick={() => handleToothClick(tooth.id)}
                onMouseEnter={() => setHoveredTooth(tooth.id)}
                onMouseLeave={() => setHoveredTooth(null)}
              >
                <div className={getToothClass(tooth.id)}>
                  {tooth.number}
                </div>
                <div className="tooth-number">{tooth.number}</div>
              </div>
            </Tooltip>
          ))}
          
          {lowerLeft.map(tooth => (
            <Tooltip key={tooth.id} content={`${tooth.number} - ${tooth.name}`}>
              <div 
                className="tooth-container"
                onClick={() => handleToothClick(tooth.id)}
                onMouseEnter={() => setHoveredTooth(tooth.id)}
                onMouseLeave={() => setHoveredTooth(null)}
              >
                <div className={getToothClass(tooth.id)}>
                  {tooth.number}
                </div>
                <div className="tooth-number">{tooth.number}</div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      
      {selectedTeeth.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700">Denti selezionati:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedTeeth.sort((a, b) => a - b).map(toothId => {
              const tooth = teethData.find(t => t.id === toothId);
              return (
                <span 
                  key={toothId} 
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tooth?.number} - {tooth?.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeethDiagram;
