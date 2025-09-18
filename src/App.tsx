import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
