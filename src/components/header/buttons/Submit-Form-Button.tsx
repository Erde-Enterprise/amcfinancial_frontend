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
      color="primary"
      endIcon={<SendIcon fontSize="small" />}
    //   onClick={props.handleSubmit}
      sx={props.sx}
      type="submit"
    >
      Submit
    </Button>
  );
}
