import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  children: ReactNode;
  sx?: SxProps<Theme> | undefined;
}
export function CustomModal({
  open,
  title,
  handleClose,
  children,
  sx,
}: CustomModalProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: sx ?? {
            width: "45%",
            height: "325px",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {title}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
