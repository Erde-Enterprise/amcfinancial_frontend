import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useContext, useState } from "react";
import AuthContext from "../../../auth/auth";

export function MenuUser() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ border: "none" }}
      >
        <Avatar
          alt={user?.nickname}
          src="/static/images/avatar/1.jpg"
          style={{ border: "none" }}
        />{" "}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        sx={{ ".MuiPaper-root": { boxShadow: "none", border: "none" } }}
      >
        <MenuItem onClick={handleClose}>Configuration</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
