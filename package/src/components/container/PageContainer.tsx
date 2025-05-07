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
    <div>
      {title && (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
