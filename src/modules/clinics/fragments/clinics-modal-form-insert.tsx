import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { SketchPicker } from "react-color";
import { useState } from "react";
import useClinic from "../hooks/use-clinics";
import { styleInputTextField } from "../../dashboard/utils/utils";

interface ClinicModalFormInsertEntity {
  handleClose: () => void;
}

export function ClinicsModalFormInsert({
  handleClose,
}: ClinicModalFormInsertEntity) {
  const { registerClinic, getAllClinics } = useClinic();
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState("#fff11");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClosePicker = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };
  const handleSubmit = async () => {
    handleClosePicker();
    await registerClinic({
      name: name,
      color: color,
    });
    setColor("#fff11");
    setName("");
    await getAllClinics().then(() => {
      handleClose();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} direction={"column"} alignItems={"center"}>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Klinik
          </InputLabel>
          <TextField
          InputProps={{
            sx: { borderRadius: styleInputTextField },
          }}
            required
            value={name}
            onChange={(e) => setName(e.target.value as string)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ background: color }}
            onClick={handleClick}
          >
            Farbe auswählen
          </Button>
          <br />
          {displayColorPicker ? (
            <div>
              <div onClick={handleClosePicker} />
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          ) : null}
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
          mt={4}
        >
          <Grid item>
            <SubmitButtonForm />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
