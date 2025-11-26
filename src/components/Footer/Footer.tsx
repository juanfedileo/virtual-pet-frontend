import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#714F3A',
        color: '#FFFFFF',
        py: 5,
        mt: 8,
        borderTop: '4px solid #8C6751',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {/* About */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Acerca de VirtualPet
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', lineHeight: 1.6 }}>
              VirtualPet es tu tienda en línea de confianza para todas las necesidades de tu mascota. Ofrecemos productos de alta calidad y asesoramiento experto para mantener a tus mascotas felices y saludables.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/catalog" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Catálogo
              </Link>
              <Link component={RouterLink} to="/" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Sobre Nosotros
              </Link>
              <Link href="#contact" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Contacto
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Contáctanos
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', mb: 1 }}>
              Email: support@virtualpet.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', mb: 1 }}>
              Tel: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0' }}>
              Direccion: 123 Pet Street, Animal City, AC 12345
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid #5F3F2C', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#EBBDA3' }}>
            © 2025 VirtualPet. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
