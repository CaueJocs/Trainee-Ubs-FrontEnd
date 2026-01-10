import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/ui/theme";

import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { MyExpenses } from "./pages/MyExpenses";
import { MyApprovals } from "./pages/MyApprovals";
import { BudgetConfigurator } from "./pages/BugdetConfigurator/BugdetConfigurator";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expenses" element={<MyExpenses />} />
            <Route path="/approvals" element={<MyApprovals />} />
            <Route path="/budget" element={<BudgetConfigurator />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
