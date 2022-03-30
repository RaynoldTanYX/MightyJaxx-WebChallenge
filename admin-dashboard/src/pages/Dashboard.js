import { Box, Input, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/logoutButton";
import ProductList from "../components/products/ProductList";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");

  const renderSearchbar = () => {
    return (
      <Input
        fullWidth
        placeholder="Search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.currentTarget.value)}
      />
    );
  };

  const renderDashboard = () => (
    <Box style={{ padding: 32 }}>
      <Typography variant="h3">Admin Dashboard</Typography>
      <Typography variant="caption">
        Logged in as {currentUser.email}
      </Typography>
      <LogoutButton />
      <Paper style={{ padding: 32 }}>
        {renderSearchbar()}
        <ProductList textFilter={searchInput} />
      </Paper>
    </Box>
  );

  const redirectToLogin = () => <Navigate to={{ pathname: "/login" }} />;

  return currentUser ? renderDashboard() : redirectToLogin();
};

export default Dashboard;
