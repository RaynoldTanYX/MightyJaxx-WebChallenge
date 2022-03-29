import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../redux/actions/productActions";
import AddProductCard from "./AddProductCard";
import LoadingProductCard from "./LoadingProductCard";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const { loading, products, error } = useSelector((state) => state.products);

  return (
    <Grid container spacing={4} style={{ padding: 32 }}>
      <Grid item xs={12} md={6} xl={4} style={{ minHeight: 300 }}>
        <AddProductCard />
      </Grid>
      {loading ? (
        <Grid item xs={12} md={6} xl={4} style={{ minHeight: 300 }}>
          <LoadingProductCard />
        </Grid>
      ) : (
        products?.map((product) => (
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
  );
};

export default ProductList;
