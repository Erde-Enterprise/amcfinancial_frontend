import { Button, SxProps, Theme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonFormEntity {
//   handleSubmit: () => void;
  sx?: SxProps<Theme> | undefined;
}

export function SearchButtonForm(
  props: SearchButtonFormEntity
) {
  return (
    <Button
      color="primary"
      endIcon={<SearchIcon fontSize="small" />}
    //   onClick={props.handleSubmit}
      sx={props.sx}
      type="submit"
    >
      Search
    </Button>
  );
}
