import { useState } from "react";
import { Button, MenuItem, Drawer, List } from "@mui/material";
import MenuIcon from "../../../../icons-images/Logo_Avegena_Finance.svg";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { styleMenuIconItem, styleMenuItem } from "../../utils/utils";

export function MenuScreen() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleRedirect = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <div>
      <Button onClick={open ? handleMenuClose : handleMenuOpen}>
        <img src={MenuIcon} style={{ width: "100%", height: "100%" }} />
        {open ? (
          <ArrowBackIosIcon fontSize="small" sx={styleMenuItem} />
        ) : (
          <ArrowForwardIosIcon fontSize="small" sx={styleMenuItem} />
        )}
      </Button>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            flex: 1,
            width: "15%",
            maxHeight: "100vh",
            overflowY: "auto",
            top: "10%",
            border: "none",
          },
        }}
      >
        <List>
        <MenuItem></MenuItem>
          <MenuItem sx={styleMenuItem} onClick={() => handleRedirect("/dashboard")}>
          <DashboardRoundedIcon fontSize="small" sx={styleMenuIconItem}/>
            Dashboard
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem sx={styleMenuItem} onClick={() => handleRedirect("/activity-history")}>
          <ArticleRoundedIcon fontSize="small" sx={styleMenuIconItem}/>
            Activity History
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem sx={styleMenuItem} onClick={() => handleRedirect("/clinics")}>
          <LocalHospitalRoundedIcon fontSize="small" sx={styleMenuIconItem}/>
            Clinics
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem sx={styleMenuItem} onClick={() => handleRedirect("/users")}>
          <PersonRoundedIcon fontSize="small" sx={styleMenuIconItem} />
            Users
          </MenuItem>
        </List>
      </Drawer>
    </div>
  );
}
