//import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Cart from './components/Store/Cart'
import Orders from './components/Store/Orders'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Catalog from './components/Store/Catalog'
import Home from './components/Store/Home'
import BackOffice from './components/BackOffice/BackOffice'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Footer from './components/Footer/Footer'
import { CartProvider } from './contexts/CartContext'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Box } from '@mui/material'

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register', '/backoffice'];
  const showFooter = !hideFooterRoutes.includes(location.pathname);
  const { isAuthenticated } = useAuth();

  return (
    <CartProvider>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ pt: '64px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={
              <ProtectedRoute allowedRoles={[ 'cliente' ]}>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/backoffice" element={
              <ProtectedRoute allowedRoles={[ 'empleado' ]}>
                <BackOffice />
              </ProtectedRoute>
            } />
            {/* Catch-all: redirect invalid routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        {showFooter && <Footer />}
      </Box>
    </CartProvider>
  )
}

export default App
