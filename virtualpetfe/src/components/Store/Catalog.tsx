import React, { useState } from 'react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBar from '../SearchBar';
import ProductList from './Products/ProductList';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 3 }}>
        <IconButton onClick={() => navigate(-1)} color="primary" sx={{ color: '#005E97' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 2, color: '#005E97' }}>
          Catalog
        </Typography>
      </Box>
      <SearchBar value={search} onChange={setSearch} />
      <ProductList searchTerm={search} />
    </Container>
  );
};

export default Catalog;
