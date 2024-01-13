import { Button, IconButton, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchButtonFormEntity {
  //   handleSubmit: () => void;
  sx?: SxProps<Theme> | undefined;
  fontSize?: "small" | "inherit" | "medium" | "large";
}

export function SearchButtonForm(props: SearchButtonFormEntity) {
  return (
    <IconButton
      color="primary"
      //   onClick={props.handleSubmit}
      sx={props.sx}
      type="submit"
    >
      <SearchIcon fontSize={props.fontSize ?? "small"} />
    </IconButton>
  );
}
