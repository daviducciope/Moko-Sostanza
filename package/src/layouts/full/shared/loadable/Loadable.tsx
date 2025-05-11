// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Suspense } from 'react';
import Spinner from 'src/views/spinner/Spinner';

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

/**
 * Componente Loadable per il caricamento lazy dei componenti
 * Assicura che i componenti che utilizzano hook di React Router siano renderizzati
 * solo all'interno del contesto del RouterProvider
 *
 * @param Component Componente da caricare in modo lazy
 * @returns Componente wrappato con Suspense
 */
const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
