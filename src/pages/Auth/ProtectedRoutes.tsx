import { AuthService } from '@/services/AuthService';
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoutes() {
  const isAuthenticated: boolean = AuthService.isAuthenticated();
  
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
}