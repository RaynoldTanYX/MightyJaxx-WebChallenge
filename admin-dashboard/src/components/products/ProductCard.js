import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditProductCard from "./EditProductCard";

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, image } = product;

  const renderProductCard = () => {
    return (
      <Card style={{ height: "100%" }}>
        <Grid container direction="column" spacing="2" style={{ padding: 16 }}>
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">SKU: {id}</Typography>
          </Grid>
        </Grid>
        <CardMedia
          component="img"
          image={image}
          style={{ objectFit: "contain", height: 220 }}
        />
        <CardActions style={{ justifyContent: "flex-end", width: "100%" }}>
          <IconButton
            onClick={() => setIsEditing(true)}
            style={{ marginRight: 16 }}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  return isEditing ? (
    <EditProductCard product={product} onCancel={() => setIsEditing(false)} />
  ) : (
    renderProductCard()
  );
};

export default ProductCard;
