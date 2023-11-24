import { useEffect, useMemo, useState } from "react";
import { TextField, Button, Grid, Box, IconButton } from "@mui/material";
import { SketchPicker } from "react-color";
import { CancelButtonFormToDashboard } from "../../components/header/buttons/Cancel-Form-Button";
import { SubmitButtonForm } from "../../components/header/buttons/Submit-Form-Button";
import useClinic from "./hooks/use-clinics";
import CustomTable from "../dashboard/components/table/custom-table/Custom-React-Table";
import { MRT_ColumnDef } from "material-react-table";
import { ClinicsEntity } from "./model/clinics.entity";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Actions } from "./fragments/actions";

export function ClinicsPage() {
  const { registerClinic, clinic, getAllClinics } = useClinic();
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState("#fff11");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [data, setData] = useState<ClinicsEntity[]>([]);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    handleClose();
  };
  const handleSubmit = async () => {
    await registerClinic({
      name: name,
      color: color,
    });
    setColor("#fff11");
    setName("");
    await getAllClinics();
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        maxSize: 200,
        size: 10,
        minSize: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
        maxSize: 200,
        size: 100,
        minSize: 10,
      },
      {
        accessorKey: "codeColor",
        header: "Hex Color",
        maxSize: 200,
        size: 30,
        minSize: 10,
      },
      {
        accessorKey: "color",
        header: "Color",
        maxSize: 200,
        size: 30,
        minSize: 10,
        Cell: ({ row }) => (
          <>
            <IconButton sx={{color:`${row.original.color}`}}>
              <FiberManualRecordIcon/>
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getAllClinics();
  }, []);

  useEffect(() => {
    if (Array.isArray(clinic?.clinics)) {
      setData(
        clinic?.clinics.map((item: ClinicsEntity, index: number) => ({
          id: ++index,
          name: item.name,
          codeColor: item.color,
          color: item.color,
        })) as ClinicsEntity[]
      );
    }
  }, [clinic?.clinics]);
  
  return (
    <Grid container spacing={2} direction={"column"} alignItems={"center"}>
      <Grid item>
        <form onSubmit={handleSubmit}>
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
                  <div onClick={handleClose} />
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
        </form>
      </Grid>
      <Grid item>
        <CustomTable
          title="List Clinics"
          loading={clinic?.loading}
          data={data}
          columns={columns}
          disableRowSelection
          actions={({ row }) => Actions(row.original.name)}
        ></CustomTable>
      </Grid>
    </Grid>
  );
}
