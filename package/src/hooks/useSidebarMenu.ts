/**
 * Hook per la selezione del menu della sidebar in base al ruolo dell'utente
 */
import { useEffect, useState } from 'react';
import { MenuItem, dentistMenu, clinicMenu } from '../constants/menus';

// Simulazione di useSession di NextAuth
// In una implementazione reale, questo verrebbe importato da next-auth/react
interface Session {
  user?: {
    email?: string;
    role?: string;
  };
}

interface UseSessionReturn {
  data: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

// Funzione di simulazione di useSession
const useSession = (): UseSessionReturn => {
  // Qui leggiamo lo stato dell'autenticazione dal localStorage
  // In una implementazione reale, questo verrebbe gestito da NextAuth
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const storedSession = localStorage.getItem('user-session');
    console.log('Stored session:', storedSession);

    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        console.log('Parsed session:', parsedSession);
        setSession(parsedSession);
        setStatus('authenticated');
      } catch (error) {
        console.error('Errore nel parsing della sessione:', error);
        setSession(null);
        setStatus('unauthenticated');
      }
    } else {
      setSession(null);
      setStatus('unauthenticated');
    }
  }, []);

  return {
    data: session,
    status
  };
};

/**
 * Hook che restituisce il menu appropriato in base al ruolo dell'utente
 */
export const useSidebarMenu = (): MenuItem[] => {
  const { data: session, status } = useSession();

  console.log('useSidebarMenu - session:', session);
  console.log('useSidebarMenu - status:', status);

  // Se l'utente non è autenticato, restituisci un array vuoto
  if (status !== 'authenticated' || !session) {
    console.log('Utente non autenticato, restituisco menu vuoto');
    return [];
  }

  // Seleziona il menu in base al ruolo dell'utente
  if (session.user?.role === 'clinic') {
    console.log('Utente clinica, restituisco clinicMenu');
    return clinicMenu;
  } else {
    console.log('Utente dentista, restituisco dentistMenu');
    // Default: dentist menu
    return dentistMenu;
  }
};

export default useSidebarMenu;
