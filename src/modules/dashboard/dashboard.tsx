import { AppBar, Box, Toolbar } from "@mui/material";
import { MenuUser } from "./components/menu-user/menu-user";
import { MenuScreen } from "./components/menu-screen/menu-screen";

export function DashboardPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" style={{backgroundColor: "transparent"}}>
        <Toolbar>
          <MenuScreen />
          <MenuUser />
        </Toolbar>
      </AppBar>
      <MenuScreen />
    </Box>
  );
}
