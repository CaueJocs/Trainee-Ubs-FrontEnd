import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { MyExpenses } from "./pages/MyExpenses";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-expenses" element={<MyExpenses />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
