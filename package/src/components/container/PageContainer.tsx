import { FC, ReactNode } from 'react';

interface PageContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ title, description, children }) => {
  // Aggiorna il titolo della pagina
  if (title) {
    document.title = `${title} | Dental MOKO`;
  }

  return (
    <div className="mx-auto px-2 sm:px-4 py-4">
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-sm p-4">
        {title && (
          <h1 className="text-2xl font-bold mb-3 text-dark dark:text-white">{title}</h1>
        )}
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
