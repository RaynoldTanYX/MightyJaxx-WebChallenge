import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoutButton from "../components/logoutButton";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const renderDashboard = () => (
    <Paper>
      <Typography variant="h1">You are logged in</Typography>
      <LogoutButton />
    </Paper>
  );

  const redirectToLogin = () => <Navigate to={{ pathname: "/login" }} />;

  return currentUser ? renderDashboard() : redirectToLogin();
};

export default Dashboard;
