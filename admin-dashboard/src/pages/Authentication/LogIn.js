import { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  checkLocalStorageForLogin,
  login,
} from "../../redux/actions/userActions";
import { Navigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const { loading, currentUser, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLocalStorageForLogin());
  }, [dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const renderLoginForm = () => (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Dashboard
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          {error && (
            <FormHelperText error>Incorrect email or password</FormHelperText>
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );

  const redirectToDashboard = () => <Navigate to={{ pathname: "/" }} />;

  return !currentUser ? renderLoginForm() : redirectToDashboard();
};

export default LogIn;
