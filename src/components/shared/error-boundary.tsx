"use client";

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error boundary caught an error', {
      error: {
        message: error.message,
        stack: error.stack,
      },
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <div>
            <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
            <p className="mt-1 text-sm text-red-600">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-2"
            onClick={this.handleReset}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
