import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ResetButtonForm } from "../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { validateLogin, validatePassword } from "../../login/utils/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserInsertEntity } from "../model/user.entity";
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import useUsers from "../hooks/use-users";
import { passwordsMatch } from "../utils/utils";
import { styleInputTextField } from "../../dashboard/utils/utils";

interface UserModalFormInsertEntity {
  handleClose: () => void;
}
export function UserModalFormInsert({
  handleClose,
}: UserModalFormInsertEntity) {
  const { registerUser, getAllUsers } = useUsers();
  const [fileName, setFileName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newUser, setNewUser] = useState<UserInsertEntity>({
    email: "",
    nickname: "",
    name: "",
    photo: undefined,
    type: 1,
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await registerUser(newUser)
      .then(async () => {
        await getAllUsers();
      })
      .then(() => {
        handleReset();
        handleClose();
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
          <Grid item xs={6}>
            <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
              Name
            </InputLabel>
            <TextField
              InputProps={{
                sx: { borderRadius: styleInputTextField },
              }}
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
              Spitzname
            </InputLabel>
            <TextField
              InputProps={{
                sx: { borderRadius: styleInputTextField },
              }}
              name="nickname"
              value={newUser.nickname}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={10}>
            <InputLabel sx={{ml:2, mb: 1, fontSize: 20, fontWeight: "bold" }}>
              E-mail
            </InputLabel>
            <TextField
              sx={{ml:2}}
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
        <Grid item container spacing={2}>
          <Grid item xs={6}>
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
                ? `Passwort zu klein`
                : ""}
            </FormHelperText>
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
              required
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
  );
}
