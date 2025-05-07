import { FC, ReactNode } from 'react';
import { Card } from 'flowbite-react';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  value: string;
  icon: ReactNode;
  primary?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({ 
  title, 
  subtitle, 
  value, 
  icon, 
  primary = "#0ea5e9" 
}) => {
  return (
    <Card className="shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">
            {value}
          </h5>
          <h6 className="text-base font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </h6>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <div 
          className="p-3 rounded-full" 
          style={{ backgroundColor: `${primary}20` }}
        >
          <div style={{ color: primary }}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
