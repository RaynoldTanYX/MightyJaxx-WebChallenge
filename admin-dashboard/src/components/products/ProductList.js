import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../actions/productActions";
import AddProductCard from "./AddProductCard";
import LoadingProductCard from "./LoadingProductCard";
import ProductCard from "./ProductCard";

const ProductList = ({ textFilter }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const { loading, products, error } = useSelector((state) => state.products);
  const filteredProducts =
    textFilter !== ""
      ? products?.filter((product) =>
          product.title.toLowerCase().includes(textFilter.toLowerCase())
        )
      : products;

  return (
    <>
      {error && (
        <Typography variant="caption" style={{ color: "red" }}>
          An error occurred: {error}
        </Typography>
      )}
      <Grid container spacing={4} style={{ padding: 32 }}>
        <Grid item xs={12} md={6} xl={4} style={{ minHeight: 300 }}>
          <AddProductCard />
        </Grid>
        {loading ? (
          <Grid item xs={12} md={6} xl={4} style={{ minHeight: 300 }}>
            <LoadingProductCard />
          </Grid>
        ) : (
          filteredProducts?.map((product) => (
            <Grid
              item
              xs={12}
              md={6}
              xl={4}
              style={{ height: 400 }}
              key={product.id}
            >
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default ProductList;
