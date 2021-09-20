// Error boundaries currently have to be classes.
import React from "react";

interface ErrorBoundaryProps {
  fallback: JSX.Element;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return (this.props as any).fallback;
    }
    return this.props.children;
  }
}