import * as React from "react";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { GridLegacy } from '@mui/material';
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductListProps {
  searchTerm?: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        Lista de productos
      </Typography>

      <GridLegacy container spacing={3} justifyContent="center">
        {products
          .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((product) => (
          <GridLegacy item xs={12} sm={6} md={4} key={product.id} component="div">
              <ProductItem
                  id={product.id}
                  name={product.title}
                  size={product.category}
                  price={product.price}
                  image={product.image}
              />
          </GridLegacy>
          ))}
       </GridLegacy>

    </div>
  );
};

export default ProductList;
