import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import EquipmentFinder from './components/EquipmentFinder/EquipmentFinder'
import ResortFinder from './components/ResortFinder/ResortFinder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/equipment" element={<EquipmentFinder />} />
      <Route path="/resorts" element={<ResortFinder />} />
    </Routes>
  )
}

export default App
