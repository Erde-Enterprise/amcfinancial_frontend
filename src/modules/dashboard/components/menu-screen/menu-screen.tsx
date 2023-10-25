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
import { useResponsive } from "../../../../utils/use-utils";

interface MenuScreenProps {
  handleMenuOpen: () => void;
  handleMenuClose: () => void;
  open: boolean;
}

export function MenuScreen(props: MenuScreenProps) {
  const { handleMenuOpen, handleMenuClose, open } = props;
  const navigate = useNavigate();
  const { responsiveStyles } = useResponsive();

  const handleRedirect = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <div>
      <Button onClick={open ? handleMenuClose : handleMenuOpen}>
        <img
          src={MenuIcon}
          style={{ width: "90%", ...responsiveStyles}}
        />
        {open ? (
          <ArrowBackIosIcon fontSize="small" sx={{...styleMenuItem,responsiveStyles}} />
        ) : (
          <ArrowForwardIosIcon fontSize="small" sx={{...styleMenuItem,responsiveStyles}} />
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
          <MenuItem
            sx={{...styleMenuItem,responsiveStyles}}
            onClick={() => handleRedirect("/dashboard")}
          >
            <DashboardRoundedIcon fontSize="small" sx={{...styleMenuIconItem, responsiveStyles}} />
            Dashboard
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem
            sx={{...styleMenuItem,responsiveStyles}}
            onClick={() => handleRedirect("/activity-history")}
          >
            <ArticleRoundedIcon fontSize="small" sx={{...styleMenuIconItem, responsiveStyles}} />
            Activity History
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem
            sx={{...styleMenuItem,responsiveStyles}}
            onClick={() => handleRedirect("/clinics")}
          >
            <LocalHospitalRoundedIcon fontSize="small" sx={{...styleMenuIconItem, responsiveStyles}} />
            Clinics
          </MenuItem>
          <MenuItem></MenuItem>
          <MenuItem sx={{...styleMenuItem,responsiveStyles}} onClick={() => handleRedirect("/users")}>
            <PersonRoundedIcon fontSize="small" sx={{...styleMenuIconItem, responsiveStyles}} />
            Users
          </MenuItem>
        </List>
      </Drawer>
    </div>
  );
}
