import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Toolbar,
} from "@mui/material";
import { MenuUser } from "./components/menu-user/menu-user";
import { MenuScreen } from "./components/menu-screen/menu-screen";
import { Table } from "./components/table/table";
import { useContext, useState } from "react";
import AuthContext from "../../auth/auth";

export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      {user?.token ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                width: "100%",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <Toolbar style={{ justifyContent: "space-between" }}>
                <MenuScreen
                  handleMenuOpen={() => handleMenuOpen()}
                  handleMenuClose={() => handleMenuClose()}
                  open={open}
                />
                <MenuUser />
              </Toolbar>
            </AppBar>
          </Box>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              marginLeft: open ? "20%" : "auto",
            }}
          >
            <Table />
          </Container>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </>
  );
}
