import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.webp';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Alimentos', icon: '🍖', slug: 'alimento' },
    { name: 'Juguetes', icon: '🎾', slug: 'juguete' },
    { name: 'Mobiliario', icon: '🛋️', slug: 'mobiliario' },
    { name: 'Productos Veterinarios', icon: '💊', slug: 'veterinaria' },
  ];

  const carouselImages = [banner1, banner2, banner3];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#005E97' }}>
          Virtual Pet nunca defraudará a su mascota
        </Typography>
      </Box>

      {/* Carousel Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            height: { xs: 200, sm: 300, md: 400 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <img
            src={carouselImages[currentImageIndex]}
            alt={`banner-${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </Box>
        {/* Carousel Dots */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {carouselImages.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: idx === currentImageIndex ? '#1976d2' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Category Cards */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Card
            key={category.name}
            onClick={() => navigate(`/catalog?category=${category.slug}`)}
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: { xs: '100%', sm: '45%', md: '22%' },
              borderRadius: '12px',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(4, 119, 190, 0.2)',
                transform: 'translateY(-6px)',
                backgroundColor: '#F1F3FA',
              },
            }}
          >
            <CardContent>
              <Box sx={{ fontSize: '3rem', mb: 1 }}>{category.icon}</Box>
              <Typography variant="h6" sx={{ color: '#005E97', fontWeight: 600 }}>{category.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* See Full Catalog Link */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          component={Link}
          to="/catalog"
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 1.8,
            background: 'linear-gradient(135deg, #005E97 0%, #0477BE 100%)',
            fontSize: '1.05rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(4, 119, 190, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(4, 119, 190, 0.4)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Ver Catálogo Completo
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
