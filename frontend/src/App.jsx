import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';      // <-- ADD
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />   {/* <-- ADDED */}
          <Route path="/orders" element={user ? <OrderPage /> : <Navigate to="/login" />} />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
