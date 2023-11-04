import { Button, SxProps, Theme } from "@mui/material";
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
    <Button
      color="inherit"
      endIcon={<CloseIcon fontSize="small" />}
      onClick={handleCancel}
      sx={props.sx}
    >
      Cancel
    </Button>
  );
}
