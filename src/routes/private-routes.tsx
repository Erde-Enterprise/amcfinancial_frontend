import { ElementType, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/auth";
import { Container } from "@mui/material";
import { Header } from "../components/header/header";

interface PrivateRouteProps {
  component: ElementType;
}

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return user?.token ? (
    <>
      <Header
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        open={open}
      />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: open ? "20%" : "auto",
          flexDirection: "column",
          gap: "0.1rem",
        }}
      >
        <Component />
      </Container>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
