import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routers from "./routes";
import PrivateRoute from "./private-routes";
import { useState } from "react";
import { Header } from "../components/header/header";
import { Container } from "@mui/material";

function AppRoutes() {
  const [open, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };
  return (
      <Router>
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
      <Routes>
        {routers.map((route) => (
          route.key === 'login-page' || route.key === 'root' ? 
          <Route key={route.key} path={route.path} element={route.element} /> :
          <Route key={route.key} path={route.path as string} element={<PrivateRoute component={route.element} />}/>
        ))}
      </Routes>
      </Container>
    </Router>
  );
}

export default AppRoutes;