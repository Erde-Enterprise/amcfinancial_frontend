import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
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
  sxGrid?: SxProps<Theme> | undefined;
}
export function CustomModal({
  open,
  title,
  handleClose,
  children,
  sx,
  sxGrid,
}: CustomModalProps) {
  return (
    <Grid container sx={sxGrid?? {flex:1}}>
      <Dialog
        maxWidth={false}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: sx ?? {
            width: "45%",
            height: "50%",
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
    </Grid>
  );
}
