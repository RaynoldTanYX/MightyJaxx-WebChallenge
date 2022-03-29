import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import EditProductCard from "./EditProductCard";

const AddProductCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const renderAddCard = () => (
    <Card style={{ height: "100%" }}>
      <CardActionArea
        style={{ height: "100%" }}
        onClick={() => setIsEditing(true)}
        disabled={isEditing}
      >
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

  return isEditing ? (
    <EditProductCard onCancel={() => setIsEditing(false)} />
  ) : (
    renderAddCard()
  );
};

export default AddProductCard;
