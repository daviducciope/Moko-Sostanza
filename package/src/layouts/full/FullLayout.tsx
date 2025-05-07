import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router";
import ScrollToTop from 'src/components/shared/ScrollToTop';
// Importiamo la nostra nuova sidebar
import Sidebar from '../../components/Sidebar';
import Header from './header/Header';
import Topbar from './header/Topbar';


const FullLayout: FC = () => {
  const navigate = useNavigate();

  // Verifica se l'utente è autenticato
  useEffect(() => {
    const storedSession = localStorage.getItem('user-session');
    console.log('FullLayout - storedSession:', storedSession);

    if (!storedSession) {
      // Se non c'è una sessione, reindirizza al login
      console.log('FullLayout - Nessuna sessione, reindirizzo al login');
      navigate('/auth/login');
    } else {
      try {
        const parsedSession = JSON.parse(storedSession);
        console.log('FullLayout - parsedSession:', parsedSession);

        // Verifica se l'utente è una clinica e se siamo nella rotta giusta
        if (parsedSession.user?.role === 'clinic' && window.location.pathname === '/') {
          console.log('FullLayout - Utente clinica nella rotta principale, reindirizzo a /clinic');
          navigate('/clinic');
        } else if (parsedSession.user?.role === 'dentist' && window.location.pathname === '/clinic') {
          console.log('FullLayout - Utente dentista nella rotta clinica, reindirizzo a /');
          navigate('/');
        }
      } catch (error) {
        console.error('FullLayout - Errore nel parsing della sessione:', error);
      }
    }
  }, [navigate]);

  return (
    <>
      <Topbar/>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            <Header/>

            <div className="bg-lightgray dark:bg-dark h-full rounded-bb">
              {/* Body Content  */}
              <div className="w-full">
                <ScrollToTop>
                  <div className="container py-30">
                    <Outlet/>
                  </div>
                </ScrollToTop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLayout;
