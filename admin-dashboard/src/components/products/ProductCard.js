import { Card, CardMedia, Grid, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  const { id, title, image } = product;

  return (
    <Card style={{ height: "100%" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing="2"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">SKU: {id}</Typography>
        </Grid>
      </Grid>
      <CardMedia component="img" image={image} height="200" />
    </Card>
  );
};

export default ProductCard;
