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
  console.log('DashboardPage is being rendered');
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

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
              style={{ backgroundColor: "transparent" }}
            >
              <Toolbar>
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
              height: "75vh",
              marginLeft: open ? "15%" : "0",
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
