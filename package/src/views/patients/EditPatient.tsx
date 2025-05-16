import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PatientForm from '../../components/patients/PatientForm';

// Interfaccia per i dati del paziente
interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthdate: string;
  gender: string;
  address: string;
  notes: string;
  udiCode: string;
  fiscalCode?: string;
  medicalHistory?: string;
  isSmoker?: boolean;
  medications?: string;
  anamnesis?: string;
}

const EditPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  // Simula il caricamento dei dati del paziente
  useEffect(() => {
    // In un'applicazione reale, qui ci sarebbe una chiamata API
    // per ottenere i dati del paziente con l'ID specificato
    setTimeout(() => {
      // Dati di esempio
      const mockPatient: Patient = {
        id: Number(id),
        name: "Mario Rossi",
        phone: "+39 333 1234567",
        email: "mario.rossi@example.com",
        birthdate: "1980-05-15",
        gender: "M",
        address: "Via Roma 123, Milano",
        notes: "Paziente con allergia al lattice. Preferisce appuntamenti mattutini.",
        udiCode: "IT-12345678",
        fiscalCode: "RSSMRA80E15F205X",
        medicalHistory: "Ipertensione, Diabete di tipo 2",
        isSmoker: true,
        medications: "Metformina 500mg (1 compressa a colazione), Ramipril 5mg (1 compressa a cena)",
        anamnesis: "Il paziente riferisce familiarità per patologie cardiovascolari. Padre deceduto per infarto miocardico a 65 anni. Madre in vita, 75 anni, affetta da ipertensione arteriosa. Non riferisce allergie a farmaci. Riferisce episodi di cefalea occasionale."
      };

      setPatient(mockPatient);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h5 className="card-title">Modifica Paziente</h5>
            <Link to={`/patients/view/${id}`} className="text-gray-500 hover:text-primary">
              <Icon icon="solar:arrow-left-linear" height={20} />
              <span className="sr-only">Torna al profilo paziente</span>
            </Link>
          </div>
        </div>

        {patient && <PatientForm isEdit={true} patientData={patient} />}
      </div>
    </>
  );
};

export default EditPatient;
