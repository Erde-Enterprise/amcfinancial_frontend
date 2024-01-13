import { Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import {
  buttonStyle,
  inputStyle,
  labelStyle,
  validateLogin,
  validatePassword,
} from "./utils/utils";
import { FinancialImage } from "./components/financial";
import useLogin from "./hooks/use-login";
import { LoadingButton } from "@mui/lab";



export function LoginPage() {
  const [access, setAccess] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useLogin();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position)=>{
      await login(access, password, position.coords.latitude, position.coords.longitude);
    });
    setLoading(false);
  };

  const isLoginValid = validateLogin(access);
  const isPasswordValid = validatePassword(password);
  const isFormValid = isLoginValid && isPasswordValid;
  localStorage.clear();
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
                  value={access}
                  onChange={(event) => setAccess(event.target.value)}
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
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                  sx={buttonStyle}
                  disabled={!isFormValid}
                >
                  ANMELDEN
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
