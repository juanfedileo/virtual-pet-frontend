import * as React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button } from "@mui/material";
import { useCart } from "../../../contexts/CartContext";

interface ProductItemProps {
  id?: number;
  name: string;
  size: string;
  price: number;
  image: string;
}
const ProductItem : React.FC<ProductItemProps> = ({ id, name, size, price, image }) => {
  const { addToCart } = useCart();
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Talle: {size}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => addToCart({ id: id ?? Date.now(), name, price, image, quantity: 1 })}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;