import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <LoadingButton onClick={handleLogout} loading={loading}>
      Logout
    </LoadingButton>
  );
};

export default LogoutButton;
