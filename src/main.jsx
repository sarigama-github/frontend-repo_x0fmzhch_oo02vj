import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ErrorBoundary } from './ErrorBoundary'

console.log('[Peakcision] Booting frontend...')

const App = lazy(() => import('./App'))
const Test = lazy(() => import('./Test'))

function Health() {
  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',fontFamily:'Inter, system-ui',background:'#f8fafc'}}>
      <div style={{padding:16,border:'1px solid #e5e7eb',borderRadius:12,background:'#fff',boxShadow:'0 10px 30px rgba(0,0,0,0.06)'}}>
        <h1 style={{fontSize:20,margin:0}}>UI is running</h1>
        <p style={{marginTop:8,color:'#6b7280'}}>If other routes are blank, they may be failing during module load.</p>
        <div style={{marginTop:12,display:'flex',gap:8}}>
          <a href="/" style={{ padding: '8px 12px', borderRadius: 10, background: '#1E3A8A', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Home</a>
          <a href="/test" style={{ padding: '8px 12px', borderRadius: 10, border: '2px solid #1E3A8A', color: '#1E3A8A', textDecoration: 'none', fontWeight: 600 }}>Test</a>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div style={{padding:24}}>Loading…</div>}>
          <Routes>
            <Route path="/health" element={<Health />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
