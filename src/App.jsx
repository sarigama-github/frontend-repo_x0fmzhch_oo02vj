import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import EquipmentFinder from './components/EquipmentFinder/EquipmentFinder'
import ResortFinder from './components/ResortFinder/ResortFinder'
import ROICalculator from './components/ROICalculator/ROICalculator'
import Profile from './components/Profile/Profile'
import SettingsPage from './components/Settings/Settings'
import Layout from './components/Layout'
import { SettingsProvider } from './SettingsContext'

function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<Dashboard />} />
          <Route path="/equipment" element={<EquipmentFinder />} />
          <Route path="/resorts" element={<ResortFinder />} />
          <Route path="/roi" element={<ROICalculator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </SettingsProvider>
  )
}

export default App
