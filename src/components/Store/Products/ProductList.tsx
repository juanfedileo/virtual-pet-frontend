import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  price: string; // API returns price as string
  category?: string;
  image?: string;
  description: string; // agregado nuevo
}

interface ProductListProps {
  searchTerm?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Dog Food",
    price: "29.99",
    category: "alimento",
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=400",
    description: "Alimento balanceado premium para perros adultos de todas las razas."
  },
  {
    id: 2,
    title: "Cat Treats",
    price: "12.99",
    category: "alimento",
    image: "https://images.unsplash.com/photo-1545568022-e889a18f0d0c?w=400",
    description: "Deliciosos snacks para gatos, sabor a salmón y atún." 
  },
  {
    id: 3,
    title: "Interactive Ball Toy",
    price: "15.99",
    category: "juguete",
    image: "https://images.unsplash.com/photo-1601738125145-9d5b8e6c1c3a?w=400",
    description: "Divertida pelota para que tu peludo nunca mas esté aburrido"
  },
  {
    id: 4,
    title: "Rope Tug Toy",
    price: "9.99",
    category: "juguete",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400",
    description:"Quien tiene mas fuerza? Vos o tu peludo? Descubrelo con este juguete de cuerdas increible"
  },
  {
    id: 5,
    title: "Pet Bed Deluxe",
    price: "79.99",
    category: "mobiliario",
    image: "https://images.unsplash.com/photo-1570129477492-45c003cedd70?w=400",
    description: "Tu peludo realmente va a disfrutar de sus siestas con esta hermosa cama deluxe super mullida"
  },
  {
    id: 6,
    title: "Scratching Post",
    price: "49.99",
    category: "mobiliario",
    image: "https://images.unsplash.com/photo-1599482903680-7f4ee5905146?w=400",
    description: "Cansado de que tu gatito arañe tus muebles? Este dispositivo es ideal para que tu minino se afile las uñas"
  },
  {
    id: 7,
    title: "Flea & Tick Prevention",
    price: "34.99",
    category: "veterinaria",
    image: "https://images.unsplash.com/photo-1584308666744-24d5f15714ae?w=400",
    description: "No dejes a tu peludo desprotegido. Uno de los mejores antipulgas y antigarrapatas del mercado."
  },
  {
    id: 8,
    title: "Veterinary Shampoo",
    price: "22.99",
    category: "veterinaria",
    image: "https://images.unsplash.com/photo-1576091160550-112173fdf921?w=400",
    description: "Queres que tu peludo luzca un pelo sedoso y brillante. Este es el shampu ideal para el. Y además, no irrita los ojitos!"
  },
];

const ProductList: React.FC<ProductListProps> = ({ searchTerm = "" }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        
        let url = `${API_URL}/products/`;
        const category = searchParams.get('category');
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
        
       setProducts(mockProducts); // <-- eliminar cuando no se usen mocks
      } catch (err: unknown) {
        // Fall back to mock products if API fails
        console.warn('Failed to fetch from API, using mock products:', err);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "2rem", pb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#005E97', fontWeight: 'bold', mb: 4 }}>
        Nuestros Productos para Mascotas
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', color: 'error.main', py: 4 }}>
            {error}
          </Typography>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.title}
              price={Number(product.price) || 0}
              image={product.image || ''}
              description={product.description}              
            />
          ))
        ) : (
          <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', color: '#404751', py: 4 }}>
            No se encontraron productos que coincidan con \"{searchTerm}\"
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductList;
