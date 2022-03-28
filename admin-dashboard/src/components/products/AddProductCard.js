import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddProductCard = () => {
  return (
    <Card style={{ height: "100%" }}>
      <CardActionArea style={{ height: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing="2"
        >
          <Grid item>
            <AddIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="caption">Add product</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default AddProductCard;
