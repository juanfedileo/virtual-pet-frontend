import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        py: 4,
        mt: 8,
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          {/* About */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              About VirtualPet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              VirtualPet is your trusted online store for all your pet needs. We offer high-quality products, veterinary services, and expert advice to keep your pets happy and healthy.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="#catalog" underline="hover" color="text.secondary">
                Catalog
              </Link>
              <Link href="#orders" underline="hover" color="text.secondary">
                Orders
              </Link>
              <Link href="#about" underline="hover" color="text.secondary">
                About Us
              </Link>
              <Link href="#contact" underline="hover" color="text.secondary">
                Contact
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@virtualpet.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Pet Street, Animal City, AC 12345
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid #ddd', mt: 3, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 VirtualPet. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
