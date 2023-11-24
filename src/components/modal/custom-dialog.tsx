import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  SxProps,
  Theme,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  text: string;
  onClickYes: () => void;
  onClose: () => void;
  sxDialog?: SxProps<Theme> | undefined;
  sxDialogContent?: SxProps<Theme> | undefined;
  sxDialogContentText?: SxProps<Theme> | undefined;
}

export default function ConfirmDialog({
  open,
  text,
  onClickYes,
  onClose,
  sxDialog,
  sxDialogContent,
  sxDialogContentText
}: ConfirmDialogProps) {
  return (
    <Dialog
      sx={sxDialog}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={sxDialogContent}>
        <DialogContentText sx={sxDialogContentText} id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onClickYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
