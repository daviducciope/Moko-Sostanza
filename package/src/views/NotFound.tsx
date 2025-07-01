import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound: React.FC = () => (
  <>
    <Helmet>
      <title>404 - Pagina non trovata | MOKO SOSTANZA Dental CRM</title>
      <meta name="description" content="La pagina che stai cercando non esiste o è stata rimossa." />
      <meta property="og:title" content="404 - Pagina non trovata" />
      <meta property="og:description" content="La pagina che stai cercando non esiste o è stata rimossa." />
      <meta property="og:image" content="/logoIcon.svg" />
    </Helmet>
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Pagina non trovata</h2>
      <p className="text-gray-600 mb-6">La pagina che stai cercando non esiste o è stata rimossa.</p>
      <a href="/" className="text-blue-500 hover:underline">Torna alla Home</a>
    </div>
  </>
);

export default NotFound;
