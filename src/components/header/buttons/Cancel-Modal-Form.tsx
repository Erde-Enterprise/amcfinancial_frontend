import { Button, SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



interface CancelButtonModalFormEntity {
    sx?: SxProps<Theme> | undefined;
    handleCancel: () => void;
  }
  
  export function CancelButtonModalForm(
    props: CancelButtonModalFormEntity
  ) {
    
    return (
      <Button
        color="inherit"
        endIcon={<CloseIcon fontSize="small" />}
        onClick={props.handleCancel}
        sx={props.sx}
      >
        Cancel
      </Button>
    );
  }