import { ComponentType, Suspense } from 'react';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary';

const Loadable = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Loadable;
