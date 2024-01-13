import { Button, SxProps, Theme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface SubmitButtonFormEntity {
//   handleSubmit: () => void;
  sx?: SxProps<Theme> | undefined;
}

export function SubmitButtonForm(
  props: SubmitButtonFormEntity
) {
  return (
    <Button
      variant="contained"
      color="primary"
    //   onClick={props.handleSubmit}
      sx={props.sx}
      type="submit"
    >
      Speichern
    </Button>
  );
}
