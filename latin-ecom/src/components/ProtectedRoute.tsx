import { Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import FullScreenLoader from './FullScreenLoader';

const ProtectedRoute = () => {
  const { user, status } = useAuth();

  if (status === 'loading') {
    return <FullScreenLoader message="Validando sesión..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
};

export default ProtectedRoute;
