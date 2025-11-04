//import { useState } from 'react'
import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import { HomePage } from './pages/HomePage'; 
import { LoginPage } from './pages/LoginPage'; 
import { AdminPage } from './pages/AdminPage'; 
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/registro" element={<RegisterPage />} /> */}
        
        {/* --- Rutas Protegidas --- */}
        {/* Esta ruta solo será accesible si el rol es 'admin' */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
          {/* Aquí irían más rutas de admin: /admin/productos, /admin/pedidos, etc. */}
        </Route>

        {/* Podrías tener rutas solo para clientes, ej: /mi-cuenta */}
        {/* <Route element={<ProtectedRoute requiredRole="cliente" />}>
          <Route path="/mi-cuenta" element={<MiCuentaPage />} />
        </Route> 
        */}
      </Routes>
    </>
  )
}

export default App
