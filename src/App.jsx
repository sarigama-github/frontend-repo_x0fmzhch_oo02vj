import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import EquipmentFinder from './components/EquipmentFinder/EquipmentFinder'
import ResortFinder from './components/ResortFinder/ResortFinder'
import ROICalculator from './components/ROICalculator/ROICalculator'
import Profile from './components/Profile/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/equipment" element={<EquipmentFinder />} />
      <Route path="/resorts" element={<ResortFinder />} />
      <Route path="/roi" element={<ROICalculator />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
