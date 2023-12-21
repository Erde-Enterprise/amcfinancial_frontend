import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../../auth/auth";
import useLogin from "../../../modules/login/hooks/use-login";
import { base64ToBlob } from "../../../modules/users/utils/utils";

export function MenuUser() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);
  const { logOut } = useLogin();
  const [photo, setPhoto] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    handleClose();
    logOut();
  };
  useEffect(() => {
    const base64Response = user?.photo as string;
    const fileType = user?.mime_type as string;
    const fileBlob = base64ToBlob(base64Response, fileType);
    setPhoto(URL.createObjectURL(fileBlob));
  }, []);
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
          src={photo}
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
        <MenuItem onClick={handleClose}>Einstellungen</MenuItem>
        <MenuItem onClick={handleLogOut}>Ausloggen</MenuItem>
      </Menu>
    </div>
  );
}
