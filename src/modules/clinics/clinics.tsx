import { useEffect, useMemo, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { CancelButtonFormToDashboard } from "../../components/header/buttons/Cancel-Form-Button";
import useClinic from "./hooks/use-clinics";
import CustomTable from "../dashboard/components/table/custom-table/Custom-React-Table";
import { MRT_ColumnDef } from "material-react-table";
import { ClinicsEntity } from "./model/clinics.entity";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Actions } from "./fragments/actions";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import { CustomModal } from "../../components/modal/custom-modal";
import { ClinicsModalFormInsert } from "./fragments/clinics-modal-form-insert";

export function ClinicsPage() {
  const { clinic, getAllClinics } = useClinic();
  const [data, setData] = useState<ClinicsEntity[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleInsertClose = () => {
    setOpen(false);
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
            <IconButton sx={{ color: `${row.original.color}` }}>
              <FiberManualRecordIcon />
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
        <CancelButtonFormToDashboard />
        <Button
          endIcon={<PlaylistAddCircleIcon fontSize="small" />}
          color="primary"
          onClick={handleOpen}
        >
          Insert
        </Button>
        <CustomModal
          sx={{ width: "35%", height: "450px" }}
          open={open}
          title="Insert"
          handleClose={handleInsertClose}
        >
          <ClinicsModalFormInsert handleClose={handleInsertClose} />
        </CustomModal>
      </Grid>
      <Grid item>
        <CustomTable
          title="List Clinics"
          loading={clinic?.loading}
          data={data}
          columns={columns}
          disableRowSelection
          actions={({ row }) => Actions(row)}
        ></CustomTable>
      </Grid>
    </Grid>
  );
}
