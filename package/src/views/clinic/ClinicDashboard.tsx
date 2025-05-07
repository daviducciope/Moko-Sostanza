import { useEffect } from "react";
import PageContainer from "../../components/container/PageContainer";

const ClinicDashboard = () => {
  useEffect(() => {
    console.log("ClinicDashboard montato");

    // Verifica se l'utente è una clinica
    const storedSession = localStorage.getItem('user-session');
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        console.log('ClinicDashboard - session:', parsedSession);
      } catch (error) {
        console.error('Errore nel parsing della sessione:', error);
      }
    }
  }, []);

  return (
    <PageContainer title="Dashboard Clinica" description="Dashboard per la gestione della clinica dentale">
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Benvenuto nella Dashboard Clinica</h2>
        <p className="mb-4">Questa è la dashboard per la gestione della clinica dentale.</p>
      </div>
    </PageContainer>
  );
};

export default ClinicDashboard;
