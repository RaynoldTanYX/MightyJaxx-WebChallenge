import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const EditProductCard = ({ product, onCancel }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [id, setId] = useState(product?.id || "");
  const [image, setImage] = useState(product?.image || "");

  const isEdit = !!product;

  const handleImageSelect = (files) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  const handleCreateProduct = () => {};

  const handleEditProduct = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? handleEditProduct() : handleCreateProduct();
  };

  const handleDelete = () => {};

  return (
    <Card style={{ height: "100%" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        style={{ height: "100%" }}
      >
        <Grid container direction="column" spacing="16" style={{ padding: 16 }}>
          <Grid item>
            <TextField
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="SKU"
              fullWidth
              required
              value={id}
              onChange={(event) => setId(event.currentTarget.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" component="label" fullWidth>
              {image === "" ? "Upload image" : "Reupload image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageSelect(e.target.files)}
              />
            </Button>
          </Grid>
          <Grid
            container
            item
            alignItems="flex-end"
            justifyContent="flex-end"
            spacing="16"
            style={{ marginTop: 8 }}
          >
            <Grid item>
              <Button onClick={onCancel}>Cancel</Button>
            </Grid>
            {isEdit && (
              <Grid item>
                <Button onClick={handleDelete}>Delete</Button>
              </Grid>
            )}
            <Grid item>
              <LoadingButton variant="contained" type="submit">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default EditProductCard;
