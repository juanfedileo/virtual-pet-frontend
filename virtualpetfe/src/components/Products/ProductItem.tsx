import * as React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";

interface ProductItemProps {
  name: string;
  size: string;
  price: number;
  image: string;
}
const ProductItem : React.FC<ProductItemProps> = ({ name, size, price, image }) => {
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
    </Card>
  );
};

export default ProductItem;