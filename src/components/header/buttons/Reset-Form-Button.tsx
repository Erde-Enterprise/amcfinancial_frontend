import { Button, SxProps, Theme } from "@mui/material";
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

interface ResetButtonFormEntity {
  handleReset: () => void;
  sx?: SxProps<Theme> | undefined;
}

export function ResetButtonForm(props: ResetButtonFormEntity) {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<RestoreRoundedIcon fontSize="medium" />}
      onClick={props.handleReset}
      sx={props.sx}
    >
      Sauber
    </Button>
  );
}
