import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/ui/theme";

import Login from "./pages/Auth/Login";
import { Home } from "./pages/Home";
import { MyExpenses } from "./pages/MyExpenses/MyExpenses";
import { MyApprovals } from "./pages/MyApprovals";
import { BudgetConfigurator } from "./pages/BugdetConfigurator/BugdetConfigurator";
import { Access } from "./pages/Access/Access";
import { Departments } from "./pages/Departments/Departments";

import { ProtectedRoutes } from "./pages/Auth/ProtectedRoutes";
import { MainLayout } from "@/components/layout/MainLayout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            {/* //Since layout has different header/footer we separate login route */}
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/my-expenses" element={<MyExpenses />} />
                <Route path="/my-approvals" element={<MyApprovals />} />
                <Route path="/budget" element={<BudgetConfigurator />} />
                <Route path="/access" element={<Access />} />
                <Route path="/departments" element={<Departments />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
