import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Errore gestito:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Si è verificato un errore</h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'Si è verificato un errore imprevisto.'}
            </p>
            <Button color="primary" onClick={this.handleReload}>
              Ricarica la pagina
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
