import { Box, Button, Grid, TextField } from "@mui/material";
import { ClinicsEntity } from "../model/clinics.entity";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { CancelButtonFormToDashboard } from "../../../components/header/buttons/Cancel-Form-Button";
import { SketchPicker } from "react-color";
import { useState } from "react";
import useClinic from "../hooks/use-clinics";

export function ClinicsModalFormUpdate({name, color}:ClinicsEntity){
    const { updateClinic, getAllClinics } = useClinic();
    const [newName, setNewName] = useState<string>(name);
    const [newColor, setNewColor] = useState(color);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);


    const handleReset = ()=>{
        setNewColor("#fff11");
        setNewName("");
    }
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
            new_name: newName
          });
      await updateClinic({
        name: name,
        color: newColor,
        new_name: newName
      });
      await getAllClinics().then(()=>{
        handleReset();
      });
    };
    

    return(<form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          direction={"column"}
          alignItems={"center"}
        >
          <Grid item>
            <TextField
              required
              label="Clinic Name"
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
              Select Color
            </Button>
            <br />
            {displayColorPicker ? (
              <div>
                <div onClick={handleClosePicker} />
                <SketchPicker color={newColor} onChange={handleColorChange} />
              </div>
            ) : null}
          </Grid>
          <Grid item>
            <Box>
              <CancelButtonFormToDashboard />
              <SubmitButtonForm />
            </Box>
          </Grid>
        </Grid>
      </form>);
}