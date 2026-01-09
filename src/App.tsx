import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import  Login  from './pages/Login'
import { Access }  from './pages/Access/Access'
import { Expenses } from './pages/Expenses/Expenses'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<Access />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  )
}

export default App