import { Button, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  validateLogin,
  validatePassword,
} from "./utils/utils";
import { FinancialImage } from "./components/financial";
import { snackActions } from "../../utils/notification/snackbar-util";

export function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    snackActions.warning("Login realizado mas a tela não será carregada");
  };

  const isLoginValid = validateLogin(login);
  const isPasswordValid = validatePassword(password);
  const isFormValid = isLoginValid && isPasswordValid;

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12} md={6}>
          <FinancialImage />
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Login or access key"
                  variant="outlined"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  InputLabelProps={labelStyle}
                  sx={inputStyle}
                  error={!isLoginValid}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  InputLabelProps={labelStyle}
                  sx={inputStyle}
                  error={!isPasswordValid}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={buttonStyle}
                  disabled={!isFormValid}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
