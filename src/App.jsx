import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import EquipmentFinder from './components/EquipmentFinder/EquipmentFinder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/equipment" element={<EquipmentFinder />} />
    </Routes>
  )
}

export default App
