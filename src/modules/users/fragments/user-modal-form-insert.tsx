import { Box, Button, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ResetButtonForm } from "../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { CancelButtonFormToDashboard } from "../../../components/header/buttons/Cancel-Form-Button";
import { validateLogin, validatePassword } from "../../login/utils/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserInsertEntity } from "../model/user.entity";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useUsers from "../hooks/use-users";
import { passwordsMatch } from "../utils/utils";

interface UserModalFormInsertEntity{
    handleClose: () => void
}
export function UserModalFormInsert({handleClose}:UserModalFormInsertEntity){
    const { registerUser, user, getAllUsers } = useUsers();
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
    
        await registerUser(newUser).then(async () => {
          await getAllUsers();
        }).then(()=>{
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
    return(<form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          {fileName && <p>Arquivo selecionado: {fileName}</p>}
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
            <Grid item xs={5}>
              <TextField
                variant="filled"
                label="Name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="filled"
                label="Nickname"
                name="nickname"
                value={newUser.nickname}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                variant="filled"
                label="Type"
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
                newUser.email !== "" && !validateLogin(newUser.email)
                  ? "Invalid email format"
                  : ""
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
                    newUser.password !== "" &&
                    !validatePassword(newUser.password)
                  }
                  required
                />
                <FormHelperText
                  style={{ whiteSpace: "pre-line" }}
                  error={
                    newUser.password !== "" &&
                    !validatePassword(newUser.password)
                  }
                >
                  {newUser.password !== "" &&
                  !validatePassword(newUser.password)
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
            <CancelButtonFormToDashboard />
            <ResetButtonForm handleReset={handleReset} />
            <SubmitButtonForm />
          </Grid>
        </Grid>
      </form>);
}