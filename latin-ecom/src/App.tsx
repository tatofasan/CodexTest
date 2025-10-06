import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import ConnectionsPage from './pages/ConnectionsPage';
import MovementsPage from './pages/MovementsPage';
import RequestsPage from './pages/RequestsPage';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FullScreenLoader from './components/FullScreenLoader';

const App = () => {
  const { user, status } = useAuth();
  const isChecking = status === 'loading';

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isChecking ? <FullScreenLoader message="Validando sesión..." /> : user ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route element={<ProtectedRoute />}> 
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/conexiones" element={<ConnectionsPage />} />
        <Route path="/wallet/movimientos" element={<MovementsPage />} />
        <Route path="/wallet/solicitudes" element={<RequestsPage />} />
        <Route path="/mi-cuenta" element={<AccountPage />} />
        <Route path="/mi-perfil" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  );
};

export default App;
