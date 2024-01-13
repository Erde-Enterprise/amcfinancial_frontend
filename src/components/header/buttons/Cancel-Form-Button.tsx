import { Button, IconButton, SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

interface CancelButtonFormToDashboardEntity {
  sx?: SxProps<Theme> | undefined;
}

export function CancelButtonFormToDashboard(
  props: CancelButtonFormToDashboardEntity
) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard/");
  };
  return (
    <IconButton
      color="inherit"
      onClick={handleCancel}
      sx={props.sx}
    >
      <CloseIcon fontSize="large" />
    </IconButton>
  );
}
