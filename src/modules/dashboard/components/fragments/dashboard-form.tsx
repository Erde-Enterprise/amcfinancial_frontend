import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Button, Grid, TextField } from "@mui/material";
import { SubmitButtonForm } from "../../../../components/header/buttons/Submit-Form-Button";
import { CancelButtonModalForm } from "../../../../components/header/buttons/Cancel-Modal-Form";
import useClinic from "../../../clinics/hooks/use-clinics";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { validatorsInvoice } from "../../utils/utils";
import { CustomType } from "../../../../components/inputs/input-type";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import { StatusInvoiceEnum } from "../../features/add-invoice/enum/add-invoice.enum";

interface ModalDashboardEntity {
  rechnung: string;
  name: string;
  price: number;
  dueDate: string;
  mahnung: number;
  description: string;
  issuedOn: string;
  attachment: File;
  status: string;
  type: string;
  clinic: string;
  handleCancel: () => void;
}

export function DashBoardModal(props: ModalDashboardEntity) {
  const [values, setValues] = useState<ModalDashboardEntity>(props);
  const [fileName, setFileName] = useState("");
  const { clinics, getAllClinics } = useClinic();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    name?: string
  ) => {
    const targetName = name ?? event.target.name;
    const targetValue = event.target.value;

    if (targetName === "attachment") {
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        if (validatorsInvoice.attachment(file)) {
          setValues((prevState) => ({ ...prevState, [targetName]: file }));
          setFileName(file.name);
        }
      }
    } else {
      setValues((prevState) => ({ ...prevState, [targetName]: targetValue }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(values);
  };

  useEffect(() => {
    getAllClinics();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {fileName && <p>Arquivo selecionado: {fileName}</p>}
          <Button
            variant="outlined"
            endIcon={<AttachFileIcon fontSize="small" />}
            component="label"
          >
            Attachment
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleChange}
              hidden
            />
          </Button>
        </Grid>
        <Grid item>
          <TextField
            name="rechnung"
            value={values.rechnung}
            onChange={handleChange}
            label="Rechnung"
          />
        </Grid>
        <Grid item>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            label="Name"
          />
        </Grid>
        <Grid item>
          <TextField
            name="price"
            value={values.price}
            onChange={handleChange}
            label="Price"
            type="number"
          />
        </Grid>
        <Grid item>
          <TextField
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="mahnung"
            value={values.mahnung}
            onChange={handleChange}
            label="Mahnung"
            type="number"
          />
        </Grid>
        <Grid item>
          <TextField
            name="description"
            value={values.description}
            onChange={handleChange}
            label="Description"
          />
        </Grid>
        <Grid item>
          <TextField
            name="issuedOn"
            value={values.issuedOn}
            onChange={handleChange}
            label="Issued On"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <CustomType
            variant="filled"
            label="Status"
            value={values.status}
            onChange={(event: any) => handleChange(event, "status")}
            error={!validatorsInvoice.status(values.status)}
            itens={Object.values(StatusInvoiceEnum)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <CustomType
            variant="filled"
            label="Type"
            value={values.type}
            onChange={(event: any) => handleChange(event, "type")}
            error={!validatorsInvoice.type(values.type)}
            itens={Object.values(CustomTypeEnum)}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="clinic"
            value={values.clinic}
            onChange={handleChange}
            label="Clinic"
          />
        </Grid>
        <Grid item>
          <CancelButtonModalForm handleCancel={props.handleCancel} />
          <SubmitButtonForm />
        </Grid>
      </Grid>
    </form>
  );
}
