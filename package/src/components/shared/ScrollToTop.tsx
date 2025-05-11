import { useEffect, ReactElement } from 'react';
import { useLocation } from "react-router-dom";

/**
 * Componente che fa scorrere la pagina verso l'alto quando cambia il pathname
 * Deve essere utilizzato all'interno di un RouterProvider
 *
 * @param children Elementi figli da renderizzare
 * @returns I children o null
 */
export default function ScrollToTop({ children }: { children: ReactElement | null }) {
  // Questo hook deve essere utilizzato all'interno di un RouterProvider
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
}