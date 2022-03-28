import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/logoutButton";
import ProductList from "../components/products/ProductList";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const renderDashboard = () => (
    <Box style={{ margin: 32, padding: 32 }}>
      <Typography variant="h3">Admin Dashboard</Typography>
      <Typography variant="caption">
        Logged in as {currentUser.email}
      </Typography>
      <LogoutButton />
      <Paper style={{ margin: 32, padding: 32 }}>
        <ProductList />
      </Paper>
    </Box>
  );

  const redirectToLogin = () => <Navigate to={{ pathname: "/login" }} />;

  return currentUser ? renderDashboard() : redirectToLogin();
};

export default Dashboard;
