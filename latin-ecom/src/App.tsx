import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import ConnectionsPage from './pages/ConnectionsPage';
import MovementsPage from './pages/MovementsPage';
import RequestsPage from './pages/RequestsPage';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/conexiones" element={<ConnectionsPage />} />
        <Route path="/wallet/movimientos" element={<MovementsPage />} />
        <Route path="/wallet/solicitudes" element={<RequestsPage />} />
        <Route path="/mi-cuenta" element={<AccountPage />} />
        <Route path="/mi-perfil" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
