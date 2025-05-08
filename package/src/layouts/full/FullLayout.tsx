import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router";
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Sidebar from '../../components/Sidebar';
import RightSidebar from '../../components/RightSidebar';
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
    <div className="min-h-screen bg-lightgray dark:bg-dark">
      {/* Topbar */}
      <Topbar />

      <div className="flex relative">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full lg:w-[calc(100%-480px)] transition-all duration-300">
          <Header />
          <div className="bg-lightgray dark:bg-dark">
            <ScrollToTop>
              <div className="p-6 md:p-8">
                <Outlet />
              </div>
            </ScrollToTop>
          </div>
        </main>

        {/* Desktop Right Sidebar */}
        <div className="hidden lg:block w-[180px] flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default FullLayout;
