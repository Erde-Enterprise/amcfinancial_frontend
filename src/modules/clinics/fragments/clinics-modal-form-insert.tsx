import { Box, Button, Grid, TextField } from "@mui/material";
import { CancelButtonFormToDashboard } from "../../../components/header/buttons/Cancel-Form-Button";
import { SubmitButtonForm } from "../../../components/header/buttons/Submit-Form-Button";
import { SketchPicker } from "react-color";
import { useState } from "react";
import useClinic from "../hooks/use-clinics";


interface ClinicModalFormInsertEntity{
    handleClose: () => void
}

export function ClinicsModalFormInsert({handleClose}:ClinicModalFormInsertEntity){

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
      await getAllClinics().then(()=>{
        handleClose();
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
              Select Color
            </Button>
            <br />
            {displayColorPicker ? (
              <div>
                <div onClick={handleClosePicker} />
                <SketchPicker color={color} onChange={handleColorChange} />
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