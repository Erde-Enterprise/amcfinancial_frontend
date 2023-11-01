import { ChangeEvent, FormEvent, useContext } from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserInsertEntity } from "./model/user.entity";
import AuthContext from "../../auth/auth";
import SendIcon from "@mui/icons-material/Send";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { snackActions } from "../../utils/notification/snackbar-util";

export function UsersPage() {
  const { user } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newUser, setNewUser] = useState<UserInsertEntity>({
    access_token: user?.token ?? "",
    email: "",
    nickname: "",
    name: "",
    photo: undefined,
    type: 0,
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNewUser((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        variant="outlined"
        endIcon={<AttachFileIcon fontSize="small" />}
        component="label"
      >
        Image
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          hidden
        />
      </Button>
      <TextField
        label="Email"
        name="email"
        value={newUser.email}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Nickname"
        name="nickname"
        value={newUser.nickname}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Name"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={newUser.password}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={newUser.password !== confirmPassword ? true : false}
        required
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
