import { Button, SxProps, Theme } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface ResetButtonFormEntity {
  handleReset: () => void;
  sx?: SxProps<Theme> | undefined;
}

export function ResetButtonForm(
  props: ResetButtonFormEntity
) {
  return (
    <Button
      color="secondary"
      endIcon={<ReplayIcon fontSize="small" />}
      onClick={props.handleReset}
      sx={props.sx}
    >
      Reset
    </Button>
  );
}
