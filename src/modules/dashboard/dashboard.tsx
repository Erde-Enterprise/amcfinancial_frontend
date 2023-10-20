import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { MenuUser } from "./components/menu-user/menu-user";
import { MenuScreen } from "./components/menu-screen/menu-screen";
import { Table } from "./components/table/table";
import { useState } from "react";

export function DashboardPage() {
  const [open, setOpen] = useState(false);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <AppBar position="static" style={{ backgroundColor: "transparent" }}>
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
          height: "60vh",
          marginLeft: open ? "15%" : "0",
        }}
      >
        <Table />
      </Container>
    </>
  );
}
