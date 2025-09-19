import './App.scss'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Dashboard from './pages/Dashboard/Dashboard'
import ToggleButton from './components/ToggleButton/ToggleButton'
import Study from './pages/Study/Study'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/study-mode' element={<Study/>}/>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
