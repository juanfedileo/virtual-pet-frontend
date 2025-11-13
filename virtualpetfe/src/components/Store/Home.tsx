import React from 'react';
import { Box, Container, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const categories = [
    { name: 'Alimentos', icon: '🍖' },
    { name: 'Juguetes', icon: '🎾' },
    { name: 'Mobiliario', icon: '🛋️' },
    { name: 'Productos Veterinarios', icon: '💊' },
  ];

  const carouselImages = [
    'https://via.placeholder.com/800x400?text=Pet+Store+1',
    'https://via.placeholder.com/800x400?text=Pet+Store+2',
    'https://via.placeholder.com/800x400?text=Pet+Store+3',
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Home
        </Typography>
      </Box>

      {/* Carousel Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <img
            src={carouselImages[currentImageIndex]}
            alt="carousel"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: { xs: '100%', sm: '45%', md: '22%' },
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ fontSize: '3rem', mb: 1 }}>{category.icon}</Box>
              <Typography variant="h6">{category.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* See Full Catalog Link */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          component={Link}
          to="/catalog"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Ver Catálogo Completo
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
