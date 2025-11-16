import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend login is now handled by the Login component
    // This page is kept for backwards compatibility
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
          bgcolor: '#FFF8D4',         // Fondo blanco limpio
          borderRadius: '16px',   // Bordes redondeados
          padding: 4,             // Relleno interno
          boxShadow: 3,           // Sombra suave para que resalte
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: '#333',         // Color de texto oscuro para alto contraste
            fontWeight: 'bold',
          }}
        >
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            // Usamos el color de acento verde para los detalles de foco
            sx={{
              '& label.Mui-focused': {
                color: '#4CAF50', // Color de la etiqueta al hacer foco
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50', // Color del borde al hacer foco
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            // Mismos estilos de foco para el campo de contraseña
            sx={{
              '& label.Mui-focused': {
                color: '#4CAF50',
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#435663',        // Color de fondo verde
              color: 'white',           // Texto blanco para máximo contraste
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#388E3C',     // Un verde más oscuro al pasar el mouse
              },
            }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};