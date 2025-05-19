import React from 'react';
import { Icon } from '@iconify/react';
import { Tooth, useDentalProcedureStore } from '../../services/DentalProcedureService';

interface TeethDiagramProps {
  selectedTeeth: number[];
  onToothClick: (toothId: number) => void;
}

export default function TeethDiagram({ selectedTeeth, onToothClick }: TeethDiagramProps) {
  const { getAllTeeth } = useDentalProcedureStore();
  const teeth = getAllTeeth();

  return (
    <div className="teeth-diagram">
      <style>
        {`
          .teeth-diagram {
            display: grid;
            grid-template-columns: repeat(16, 1fr);
            gap: 4px;
            padding: 16px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .tooth {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
          }
          .tooth.selected {
            background: #e3f2fd;
            border-color: #2196f3;
          }
          .tooth:hover {
            border-color: #2196f3;
          }
          .tooth-number {
            font-size: 0.75rem;
            position: absolute;
            bottom: 2px;
            right: 2px;
          }
        `}
      </style>
      {teeth.map((tooth) => (
        <div
          key={tooth.id}
          className={`tooth ${selectedTeeth.includes(tooth.id) ? 'selected' : ''}`}
          onClick={() => onToothClick(tooth.id)}
          title={tooth.name}
        >
          <Icon icon="solar:tooth-outline" className="w-6 h-6" />
          <span className="tooth-number">{tooth.number}</span>
        </div>
      ))}
    </div>
  );
}
