import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#fff' }}>
          <div style={{ maxWidth: 720, width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ color: '#6b7280', marginBottom: 12 }}>The UI crashed while rendering this page. Try the Test page to verify basics or share the error below.</p>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f9fafb', padding: 12, borderRadius: 8, fontSize: 12, lineHeight: 1.5, color: '#111827' }}>
{String(this.state.error)}
            </pre>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <a href="/test" style={{ padding: '10px 14px', borderRadius: 10, background: '#1E3A8A', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Go to Test</a>
              <a href="/" style={{ padding: '10px 14px', borderRadius: 10, border: '2px solid #1E3A8A', color: '#1E3A8A', textDecoration: 'none', fontWeight: 600 }}>Home</a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
