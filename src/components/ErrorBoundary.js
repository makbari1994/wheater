import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorMessage: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-red-600">{this.state.errorMessage}</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
