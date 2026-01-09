import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import  Login  from './pages/Login'
import { Access } from './pages/Access/Access'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accesses" element={<Access />} />
      </Routes>
    </Router>
  )
}

export default App
