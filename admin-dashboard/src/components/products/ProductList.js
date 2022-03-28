import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../redux/actions/productActions";
import AddProductCard from "./AddProductCard";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const { loading, products, error } = useSelector((state) => state.products);

  return (
    <Grid container spacing={2} style={{ margin: 32 }}>
      <Grid item xs={12} sm={6} md={3} lg={2} style={{ minHeight: 300 }}>
        <AddProductCard />
      </Grid>
      {products?.map((product) => (
        <Grid item xs={12} sm={6} md={3} lg={2} style={{ minHeight: 300 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
