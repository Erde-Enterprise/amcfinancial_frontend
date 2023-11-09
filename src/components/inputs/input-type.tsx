import { FormControl, InputLabel, MenuItem, Select, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

 interface CustomSelectEntity {
  children?: ReactNode[];
  labelId?: string;
  label?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: any;
  itens?: any[];
  required?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  variant?: "standard" | "outlined" | "filled";
  disabled?: boolean;
}

export function CustomType({
  labelId,
  label,
  id,
  value,
  defaultValue,
  onChange,
  itens,
  required = false,
  error,
  sx,
  variant,
  disabled,
}: CustomSelectEntity) {
  return (
    <FormControl sx={sx} variant={variant}>
    <InputLabel>{label}</InputLabel>
    <Select
      labelId={labelId}
      label={label}
      id={id}
      value={value}
      required={required}
      onChange={(event) => onChange(event)}
      defaultValue={defaultValue}
      MenuProps={{ style: { maxHeight: 250 } }}
      variant={variant}
      error={error}
      sx={sx}
      disabled={disabled}
    >
      {!required && <MenuItem value={""}>{defaultValue ?? "..."}</MenuItem>}
      {itens?.map((item, index) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
    </FormControl>
  );
}
