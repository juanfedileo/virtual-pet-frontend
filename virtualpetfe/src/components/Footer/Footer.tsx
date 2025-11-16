import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

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
              About VirtualPet
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', lineHeight: 1.6 }}>
              VirtualPet is your trusted online store for all your pet needs. We offer high-quality products, veterinary services, and expert advice to keep your pets happy and healthy.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#catalog" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Catalog
              </Link>
              <Link href="#orders" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Orders
              </Link>
              <Link href="#about" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                About Us
              </Link>
              <Link href="#contact" underline="hover" sx={{ color: '#EBBDA3', '&:hover': { color: '#FFFFFF' }, transition: 'color 0.3s' }}>
                Contact
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.1rem' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', mb: 1 }}>
              Email: support@virtualpet.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0', mb: 1 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFD7C0' }}>
              Address: 123 Pet Street, Animal City, AC 12345
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid #5F3F2C', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#EBBDA3' }}>
            © 2025 VirtualPet. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
