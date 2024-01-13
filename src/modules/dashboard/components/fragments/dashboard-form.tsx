import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { SubmitButtonForm } from "../../../../components/header/buttons/Submit-Form-Button";
import { CancelButtonModalForm } from "../../../../components/header/buttons/Cancel-Modal-Form";
import useClinic from "../../../clinics/hooks/use-clinics";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  styleInputTextField,
  validatorsInvoice,
} from "../../utils/utils";
import { CustomType } from "../../../../components/inputs/input-type";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import { StatusInvoiceEnum } from "../../features/add-invoice/enum/add-invoice.enum";
import useDashboard from "../../hooks/use-dashboard";
import { getKeyFromValue, getValueFromKey } from "../../../../utils/utils";
import { ResetButtonForm } from "../../../../components/header/buttons/Reset-Form-Button";

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
  scheduledDate: string;
  handleCancel?: () => void;
}

export function DashBoardModal(props: ModalDashboardEntity) {
  const [values, setValues] = useState<ModalDashboardEntity>(props);
  const [fileName, setFileName] = useState("");
  const { clinic, getAllClinics } = useClinic();
  const { getInvoices, updateInvoice } = useDashboard();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const actualityRechnung = props.rechnung;

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateInvoice({
      amount: values.price,
      attachment: values.attachment,
      description: values.description,
      due_date: values.dueDate,
      invoice_number: actualityRechnung,
      issue_date: values.issuedOn,
      name_clinic: values.clinic,
      new_invoice_number: values.rechnung,
      reminder: values.mahnung,
      status: getKeyFromValue(values.status, StatusInvoiceEnum),
      title: values.name,
      type: getKeyFromValue(values.type, CustomTypeEnum),
      scheduled_date: values.scheduledDate,
    }).then(async () => {
      await getInvoices(getFirstDayOfMonth(), getLastDayOfMonth());
    });
  };

  useEffect(() => {
    getAllClinics();
  }, []);
  const handleReset = () => {
    setValues({
      rechnung: "",
      name: "",
      price: 0,
      dueDate: "",
      mahnung: 0,
      description: "",
      issuedOn: "",
      attachment: new File([""], ""),
      status: "",
      type: "",
      clinic: "",
      scheduledDate: "",
    });
    setFileName("");
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {fileName && <p>Ausgewählte Datei: {fileName}</p>}
          <Button
            variant="outlined"
            endIcon={<AttachFileIcon fontSize="small" />}
            component="label"
          >
            Anhang
            <input
              ref={inputFileRef}
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleChange}
              hidden
            />
          </Button>
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Rechnung
          </InputLabel>
          <TextField
            name="rechnung"
            value={values.rechnung}
            onChange={handleChange}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Name
          </InputLabel>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            {"Preis (CHF)"}
          </InputLabel>
          <TextField
            name="price"
            value={values.price}
            onChange={handleChange}
            type="number"
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Fälligkeitsdatum
          </InputLabel>
          <TextField
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Mahnung
          </InputLabel>
          <TextField
            name="mahnung"
            value={values.mahnung}
            onChange={handleChange}
            type="number"
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Beschreibung
          </InputLabel>
          <TextField
            multiline
            rows={4}
            name="description"
            value={values.description}
            onChange={handleChange}
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Ausgegeben am
          </InputLabel>
          <TextField
            name="issuedOn"
            value={values.issuedOn}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Status
          </InputLabel>
          <CustomType
            variant="outlined"
            value={values.status}
            onChange={(event: any) => handleChange(event, "status")}
            error={!validatorsInvoice.status(values.status)}
            itens={Object.values(StatusInvoiceEnum)}
            sx={{ width: "100%" }}
            style={{ borderRadius: styleInputTextField }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Geplant
          </InputLabel>
          <TextField
            variant="outlined"
            name="scheduledDate"
            value={values.scheduledDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            error={
              values.status === StatusInvoiceEnum.S &&
              (values.scheduledDate === "" ||
                values.scheduledDate === undefined)
            }
            sx={{ width: "100%" }}
            InputProps={{
              sx: { borderRadius: styleInputTextField },
            }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Typ
          </InputLabel>
          <CustomType
            variant="outlined"
            value={values.type}
            onChange={(event: any) => handleChange(event, "type")}
            error={!validatorsInvoice.type(values.type)}
            itens={Object.values(CustomTypeEnum)}
            sx={{ width: "100%" }}
            style={{ borderRadius: styleInputTextField }}
          />
        </Grid>
        <Grid item>
          <InputLabel sx={{ mb: 1, fontSize: 20, fontWeight: "bold" }}>
            Lokal
          </InputLabel>
          <CustomType
            variant="outlined"
            value={values.clinic}
            onChange={(event: any) => handleChange(event, "clinic")}
            error={!validatorsInvoice.clinic(values.clinic)}
            itens={clinic?.clinics?.map((item) => item.name)}
            sx={{ width: "100%" }}
            style={{ borderRadius: styleInputTextField }}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
          mt={1}
        >
          <Grid item>
            <ResetButtonForm handleReset={handleReset} />
            <SubmitButtonForm sx={{ml:1}} />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
