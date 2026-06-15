import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';
import './styles/global.scss';

const isAuthenticated = () => localStorage.getItem('lendsqr_auth') === 'true';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { document.documentElement.scrollTop = 0; }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/users" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

const PlaceholderPage: React.FC = () => (
  <div style={{ padding: '60px 0', textAlign: 'center', color: '#545F7D' }}>
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
      style={{ margin: '0 auto 20px', display: 'block', opacity: 0.3 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    <h2 style={{ fontSize: 20, fontWeight: 500, color: '#213F7D', marginBottom: 8 }}>Page Coming Soon</h2>
    <p style={{ fontSize: 14 }}>This section is under construction.</p>
  </div>
);

export default App;
