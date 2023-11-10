import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { InvoiceInsertEntity } from "./model/add-invoice.entity";
import { validateForm, validatorsInvoice } from "../../utils/utils";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { CancelButtonFormToDashboard } from "../../../../components/header/buttons/Cancel-Form-Button";
import { ResetButtonForm } from "../../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../../components/header/buttons/Submit-Form-Button";
import useDashboard from "../../hooks/use-dashboard";
import { CustomType } from "../../../../components/inputs/input-type";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import useClinic from "../../../clinics/hooks/use-clinics";
import { StatusInvoiceEnum } from "./enum/add-invoice.enum";

export function AddInvoice() {
  const [fileName, setFileName] = useState("");
  const { clinics, getAllClinics } = useClinic();
  const { registerInvoice } = useDashboard();
  const [invoice, setInvoice] = useState<InvoiceInsertEntity>({
    rechnung: "",
    name: "",
    price: "",
    dueDate: "",
    mahnung: "",
    description: "",
    issuedOn: "",
    attachment: new File([""], ""),
    status: "",
    type: "",
    clinic: "",
  });

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
          setInvoice((prevState) => ({ ...prevState, [targetName]: file }));
          setFileName(file.name);
        }
      }
    } else {
      setInvoice((prevState) => ({ ...prevState, [targetName]: targetValue }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm(invoice)) {
      await registerInvoice(invoice);
      handleReset();
    }
  };
  const handleReset = () => {
    setInvoice({
      rechnung: "",
      name: "",
      price: "",
      dueDate: "",
      mahnung: "",
      description: "",
      issuedOn: "",
      attachment: new File([""], ""),
      status: "",
      type: "",
      clinic: "",
    });
    setFileName("");
  };

  useEffect(() => {
    getAllClinics();
  }, []);
  return (
    <>
      <Container sx={{ flexDirection: "column", flex: 1, marginTop: "10%" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
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
            <br />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    variant="filled"
                    name="rechnung"
                    label="Rechnung"
                    value={invoice.rechnung}
                    onChange={handleChange}
                    error={!validatorsInvoice.rechnung(invoice.rechnung)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.5}>
                  <TextField
                    variant="filled"
                    name="price"
                    label="Price"
                    value={invoice.price}
                    onChange={handleChange}
                    error={!validatorsInvoice.price(invoice.price)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1.5}>
                  <TextField
                    variant="filled"
                    name="mahnung"
                    label="Mahnung"
                    value={invoice.mahnung}
                    onChange={handleChange}
                    error={!validatorsInvoice.mahnung(invoice.mahnung)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <CustomType
                    variant="filled"
                    label="Type"
                    value={invoice.type}
                    onChange={(event: any) => handleChange(event, "type")}
                    error={!validatorsInvoice.type(invoice.type)}
                    itens={Object.values(CustomTypeEnum)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    variant="filled"
                    name="issuedOn"
                    label="Issue Date"
                    value={invoice.issuedOn}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!validatorsInvoice.issuedOn(invoice.issuedOn)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    variant="filled"
                    name="dueDate"
                    label="Due Date"
                    value={invoice.dueDate}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={
                      !validatorsInvoice.dueDate(invoice.dueDate) ||
                      new Date(invoice.dueDate) < new Date(invoice.issuedOn)
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    name="name"
                    label="Name"
                    value={invoice.name}
                    onChange={handleChange}
                    error={!validatorsInvoice.name(invoice.name)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomType
                    variant="filled"
                    label="Status"
                    value={invoice.status}
                    onChange={(event: any) => handleChange(event, "status")}
                    error={!validatorsInvoice.status(invoice.status)}
                    itens={Object.values(StatusInvoiceEnum)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomType
                    variant="filled"
                    label="Clinic"
                    value={invoice.clinic}
                    onChange={(event: any) => handleChange(event, "clinic")}
                    error={!validatorsInvoice.clinic(invoice.clinic)}
                    itens={clinics?.map((item) => {
                      return item.name;
                    })}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    name="description"
                    label="Description"
                    value={invoice.description}
                    onChange={handleChange}
                    error={!validatorsInvoice.description(invoice.description)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={3.5}>
                  <CancelButtonFormToDashboard />
                  <ResetButtonForm handleReset={handleReset} />
                  <SubmitButtonForm />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
