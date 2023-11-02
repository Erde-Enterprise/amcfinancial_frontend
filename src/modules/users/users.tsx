import { ChangeEvent, FormEvent, useContext } from "react";
import { useState } from "react";
import { Button, Grid, TextField, FormHelperText, Box } from "@mui/material";
import { UserInsertEntity } from "./model/user.entity";
import AuthContext from "../../auth/auth";
import SendIcon from "@mui/icons-material/Send";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { snackActions } from "../../utils/notification/snackbar-util";
import useEndPoint from "../../auth/endpoints";
import { validateLogin, validatePassword } from "../login/utils/utils";
import { passwordsMatch } from "./utils/utils";

export function UsersPage() {
  const { user } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { goToDashboardInCancelButton } = useEndPoint();

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
  const handleReset = () => {
    setNewUser({
      access_token: user?.token ?? "",
      email: "",
      nickname: "",
      name: "",
      photo: undefined,
      type: 0,
      password: "",
    });
  };
  const handleCancel = () => {
    goToDashboardInCancelButton();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
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
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="filled"
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="filled"
              label="Nickname"
              name="nickname"
              value={newUser.nickname}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ width: "100%" }}>
          <TextField
            variant="filled"
            label="Email"
            name="email"
            value={newUser.email}
            error={newUser.email !== "" && !validateLogin(newUser.email)}
            onChange={handleInputChange}
            fullWidth
            required
            helperText={
              newUser.email !== "" && !validateLogin(newUser.email) ? "Invalid email format" : ""
            }
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <TextField
                variant="filled"
                label="Password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                error={
                  newUser.password !== "" && !validatePassword(newUser.password)
                }
                required
              />
              <FormHelperText
                style={{ whiteSpace: "pre-line" }}
                error={
                  newUser.password !== "" && !validatePassword(newUser.password)
                }
              >
                {newUser.password !== "" && !validatePassword(newUser.password)
                  ? `Password too small`
                  : ""}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="filled"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!passwordsMatch(newUser.password, confirmPassword)}
              helperText={
                !passwordsMatch(newUser.password, confirmPassword)
                  ? "Passwords don't match"
                  : ""
              }
              required
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            color="inherit"
            endIcon={<CloseIcon fontSize="small" />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            endIcon={<ReplayIcon fontSize="small" />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            color="primary"
            endIcon={<SendIcon fontSize="small" />}
            type="submit"
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
