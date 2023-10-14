import { InputLabelProps, SxProps, Theme } from "@mui/material";

export function validateLogin(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function validatePassword(password: string): boolean {
  
  return password?.trim() !== '' && password.length>3 ? true: false;
}

export const inputStyle: SxProps<Theme> | undefined = {
  backgroundColor: "#E8EFF8",
  color: "#A0A3BD",
  borderRadius: "15px",
  "& fieldset": { border: "none" },
  width: "90%"
};
export const labelStyle: Partial<InputLabelProps> | undefined = {
  style: { color: "#A0A3BD" }
};

export const buttonStyle: SxProps<Theme> | undefined = {
  backgroundColor: "#007AFF",
  borderRadius: "10px",
  width: "90%"
};
