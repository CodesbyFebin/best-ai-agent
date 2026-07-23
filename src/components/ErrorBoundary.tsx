import React, { Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
  errorInfo?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unknown runtime error occurred.',
    };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('BestAIAgent.in Application Crash:', error, info);
    this.setState({
      errorInfo: info.componentStack || undefined,
    });
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-lg font-black text-sm">
                !
              </span>
              <h1 className="text-xl font-bold text-white">BestAIAgent.in Application Error</h1>
            </div>
            <p className="text-sm text-slate-300">
              An unexpected interface component error occurred. Our technical monitoring team has logged this issue.
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-red-400 overflow-x-auto">
              {this.state.message}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.location.assign('/')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
              >
                Return to Homepage
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
