import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../../redux/actions/productActions";

const EditProductCard = ({ product, onCancel }) => {
  const { loading } = useSelector((state) => state.products.product);

  const [title, setTitle] = useState(product?.title || "");
  const [id, setId] = useState(product?.id || "");
  const [image, setImage] = useState(product?.image || "");
  const editedProduct = { title, id, image };

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const isEdit = !!product;

  const onSuccess = () => {
    setError("");
    onCancel();
  };

  const onError = (error) => {
    setError(error);
  };

  const handleImageSelect = (files) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  const handleCreateProduct = () => {
    dispatch(addProduct(editedProduct, { onSuccess, onError }));
  };

  const handleEditProduct = () => {
    dispatch(editProduct(editedProduct, { onSuccess, onError }));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(editedProduct, { onSuccess: () => {}, onError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? handleEditProduct() : handleCreateProduct();
  };

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
              disabled={isEdit}
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

          {error && (
            <Grid item>
              <Typography variant="caption" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
          )}

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
                <LoadingButton onClick={handleDelete} loading={loading}>
                  Delete
                </LoadingButton>
              </Grid>
            )}
            <Grid item>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
              >
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
