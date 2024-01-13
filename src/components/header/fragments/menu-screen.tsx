import { Button, MenuItem, Drawer, List } from "@mui/material";
import MenuIcon from "../../../icons-images/Logo_Avegena_Finance.svg";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  styleMenuIconItem,
  styleMenuItem,
} from "../../../modules/dashboard/utils/utils";
import { useResponsive } from "../../../utils/use-utils";
import { useContext, useState } from "react";
import AuthContext from "../../../auth/auth";

interface MenuScreenProps {
  handleMenuOpen: () => void;
  handleMenuClose: () => void;
  open: boolean;
}

export function MenuScreen(props: MenuScreenProps) {
  const { handleMenuOpen, handleMenuClose, open } = props;
  const navigate = useNavigate();
  const { responsiveStyles } = useResponsive();
  const { user } = useContext(AuthContext);
  const [activePage, setActivePage] = useState<string>("/dashboard");

  const handleRedirect = (path: string) => {
    setActivePage(path);
    navigate(path);
    handleMenuClose();
  };

  return (
    <div>
      <Button
        style={{ transition: "transform 1s" }}
        onClick={open ? handleMenuClose : handleMenuOpen}
      >
        <img src={MenuIcon} style={{ width: "100%", ...responsiveStyles }} />
        {open ? (
          <ArrowBackIosIcon
            fontSize="small"
            sx={{ ...styleMenuItem, responsiveStyles }}
          />
        ) : (
          <ArrowForwardIosIcon
            fontSize="small"
            sx={{ ...styleMenuItem, responsiveStyles }}
          />
        )}
      </Button>
      <Drawer
        sx={{ display: "flex" }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            flex: 1,
            width: "15%",
            maxHeight: "100vh",
            overflowY: "auto",
            top: "5.8%",
            transition: "width 1s",
          },
        }}
      >
        {user?.type === 0 ? (
          <List>
            <MenuItem></MenuItem>
            <MenuItem
              sx={{
                ...styleMenuItem,
                responsiveStyles,
                color: activePage === "/dashboard" ? "#007AFF" : "#A0A3BD",
              }}
              onClick={() => handleRedirect("/dashboard")}
            >
              <DashboardRoundedIcon
                fontSize="small"
                sx={{ ...styleMenuIconItem, responsiveStyles }}
              />
              Dashboard
            </MenuItem>
            <MenuItem></MenuItem>
            {}
            <MenuItem
              sx={{ ...styleMenuItem, responsiveStyles, color: activePage === "/activity-history" ? "#007AFF" : "#A0A3BD", }}
              onClick={() => handleRedirect("/activity-history")}
            >
              <ArticleRoundedIcon
                fontSize="small"
                sx={{ ...styleMenuIconItem, responsiveStyles }}
              />
              Activity History
            </MenuItem>
            <MenuItem></MenuItem>
            <MenuItem
              sx={{ ...styleMenuItem, responsiveStyles, color: activePage === "/clinics" ? "#007AFF" : "#A0A3BD"}}
              onClick={() => handleRedirect("/clinics")}
            >
              <LocalHospitalRoundedIcon
                fontSize="small"
                sx={{ ...styleMenuIconItem, responsiveStyles }}
              />
              Clinics
            </MenuItem>
            <MenuItem></MenuItem>
            <MenuItem
              sx={{ ...styleMenuItem, responsiveStyles, color: activePage === "/users" ? "#007AFF" : "#A0A3BD"}}
              onClick={() => handleRedirect("/users")}
            >
              <PersonRoundedIcon
                fontSize="small"
                sx={{ ...styleMenuIconItem, responsiveStyles }}
              />
              Users
            </MenuItem>
          </List>
        ) : (
          <List>
            <MenuItem></MenuItem>
            <MenuItem
              sx={{ ...styleMenuItem, responsiveStyles, color: activePage === "/dashboard" ? "#007AFF" : "#A0A3BD", }}
              onClick={() => handleRedirect("/dashboard")}
            >
              <DashboardRoundedIcon
                fontSize="small"
                sx={{ ...styleMenuIconItem, responsiveStyles }}
              />
              Dashboard
            </MenuItem>
            <MenuItem></MenuItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}
