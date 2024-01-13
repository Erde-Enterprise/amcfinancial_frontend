import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { UserUpdateEntity } from "../model/user.entity";
import { ResetButtonForm } from "../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { passwordsMatch, validateUpdatePassword } from "../utils/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import useUsers from "../hooks/use-users";
import AttachmentRoundedIcon from "@mui/icons-material/AttachmentRounded";
import { validateLogin } from "../../login/utils/utils";
import { styleInputTextField } from "../../dashboard/utils/utils";

export function UserModalUpdateForm({
  email,
  name,
  new_nickname,
  nickname,
  photo,
  type,
}: UserUpdateEntity) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { updateUser, user, getAllUsers } = useUsers();
  const [fileName, setFileName] = useState("");
  const [newUser, setNewUser] = useState<UserUpdateEntity>({
    email: email,
    new_nickname: new_nickname,
    nickname: nickname,
    name: name,
    photo: photo,
    type: type,
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateUser(newUser)
      .then(async () => {
        await getAllUsers();
      })
      .then(() => {
        handleReset();
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const hadleSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNewUser((prevState) => ({
      ...prevState,
      photo: file,
    }));
    if (file) {
      setFileName(file.name);
    }
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleReset = () => {
    setNewUser({
      new_nickname: "",
      email: "",
      nickname: "",
      name: "",
      photo: undefined,
      type: 1,
      password: "",
    });
    setConfirmPassword("");
    setFileName("");
  };
  const types: string[] = ["1", "2"];

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {fileName && <p>Ausgewählte Datei: {fileName}</p>}
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<AttachmentRoundedIcon fontSize="small" />}
                component="label"
              >
                Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={5}>
                <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                  Name
                </InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: styleInputTextField },
                  }}
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                  Spitzname
                </InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: styleInputTextField },
                  }}
                  name="new_nickname"
                  value={newUser.new_nickname}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                  Typ
                </InputLabel>
                <Select
                  fullWidth
                  style={{ borderRadius: styleInputTextField }}
                  name="type"
                  id="type"
                  value={newUser.type.toString()}
                  onChange={hadleSelect}
                  required
                >
                  {types.map((item, index: number) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ width: "100%" }}>
              <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                E-mail
              </InputLabel>
              <TextField
                InputProps={{
                  sx: { borderRadius: styleInputTextField },
                }}
                name="email"
                value={newUser.email}
                error={newUser.email !== "" && !validateLogin(newUser.email)}
                onChange={handleInputChange}
                fullWidth
                required
                helperText={
                  newUser.email !== "" && !validateLogin(newUser.email)
                    ? "Ungültiges E-Mail-Format"
                    : ""
                }
              />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                    Passwort Bestätigen
                  </InputLabel>
                  <TextField
                    fullWidth
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    error={
                      newUser.password !== "" &&
                      !validateUpdatePassword(newUser.password)
                    }
                  />
                  <FormHelperText
                    style={{ whiteSpace: "pre-line" }}
                    error={
                      newUser.password !== "" &&
                      !validateUpdatePassword(newUser.password)
                    }
                  >
                    {newUser.password !== "" &&
                    !validateUpdatePassword(newUser.password)
                      ? `Passwort zu klein`
                      : ""}
                  </FormHelperText>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
                  Passwort Bestätigen
                </InputLabel>
                <TextField
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: styleInputTextField },
                  }}
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!passwordsMatch(newUser.password, confirmPassword)}
                  helperText={
                    !passwordsMatch(newUser.password, confirmPassword)
                      ? "Passwörter stimmen nicht überein"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems={"flex-end"}
              justifyContent={"flex-end"}
            >
              <Grid item marginTop={2}>
                <ResetButtonForm handleReset={handleReset} />
                <SubmitButtonForm sx={{ ml: 1 }} />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
