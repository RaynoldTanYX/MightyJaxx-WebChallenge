import { Card, Grid, Skeleton } from "@mui/material";

const LoadingProductCard = () => {
  return (
    <Card style={{ height: "100%" }}>
      <Grid container direction="column" style={{ padding: 8 }}>
        <Grid item>
          <Skeleton
            variant="text"
            animation="wave"
            style={{ height: 42, width: "80%" }}
          />
        </Grid>
        <Grid item>
          <Skeleton variant="text" animation="wave" style={{ height: 24 }} />
        </Grid>
      </Grid>
      <Skeleton
        variant="rectangular"
        animation="wave"
        style={{ height: "100%" }}
      />
    </Card>
  );
};

export default LoadingProductCard;
