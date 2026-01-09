import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import  Login  from './pages/Login'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

//   export default App

 import { Access } from "./pages/Access/Access";


 export default function App() {
   return <Access />;
  }
