import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { ClinicsEntity } from "../model/clinics.entity";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { SketchPicker } from "react-color";
import { useState } from "react";
import useClinic from "../hooks/use-clinics";
import { styleInputTextField } from "../../dashboard/utils/utils";

export function ClinicsModalFormUpdate({ name, color }: ClinicsEntity) {
  const { updateClinic, getAllClinics } = useClinic();
  const [newName, setNewName] = useState<string>(name);
  const [newColor, setNewColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleReset = () => {
    setNewColor("#fff11");
    setNewName("");
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClosePicker = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (newColor: any) => {
    setNewColor(newColor.hex);
    //handleClosePicker();
  };
  const handleSubmit = async () => {
    handleClosePicker();
    console.log({
      name: name,
      color: newColor,
      new_name: newName,
    });
    await updateClinic({
      name: name,
      color: newColor,
      new_name: newName,
    });
    await getAllClinics().then(() => {
      handleReset();
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
            value={newName}
            onChange={(e) => setNewName(e.target.value as string)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ background: newColor }}
            onClick={handleClick}
          >
            Farbe auswählen
          </Button>
          <br />
          {displayColorPicker ? (
            <div>
              <div onClick={handleClosePicker} />
              <SketchPicker color={newColor} onChange={handleColorChange} />
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
