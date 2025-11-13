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
import Footer from './components/Footer/Footer'
import { CartProvider } from './contexts/CartContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

function App() {
  return (
    <CartProvider>
        <NavBar />
        <Box sx={{ pt: '64px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/backoffice" element={<BackOffice />} />
          </Routes>
        </Box>
        <Footer />
    </CartProvider>
  )
}

export default App
