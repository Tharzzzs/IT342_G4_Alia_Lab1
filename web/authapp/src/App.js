import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PublicRoute from './routes/PublicRoutes';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  // Save last valid protected route
  useEffect(() => {
    if (
      isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  return (
    <Routes>
      {/* Public but BLOCKED when logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
      />

      {/* Catch all */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
