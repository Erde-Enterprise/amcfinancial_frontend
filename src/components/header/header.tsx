import { Box, AppBar, Toolbar } from "@mui/material";
import { MenuScreen } from "./fragments/menu-screen";
import { MenuUser } from "./fragments/menu-user";

interface HeaderProps{
    handleMenuOpen: () => void
    handleMenuClose: () => void
    open: boolean
}
export function Header({handleMenuOpen, handleMenuClose, open}:HeaderProps) {
 
  return (
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
  );
}
