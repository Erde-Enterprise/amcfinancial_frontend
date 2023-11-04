import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { InvoiceInsertEntity } from "./model/add-invoice.entity";
import { validateForm, validatorsInvoice } from "../../utils/utils";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { CancelButtonFormToDashboard } from "../../../../components/header/buttons/Cancel-Form-Button";
import { ResetButtonForm } from "../../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../../components/header/buttons/Submit-Form-Button";

export function AddInvoice() {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (name === "attachment") {
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        if (validatorsInvoice.attachment(file)) {
          // Se o arquivo for válido, atualize o estado
          setInvoice((prevState) => ({ ...prevState, [name]: file }));
        } else {
          console.log("Invalid file");
        }
      }
    } else {
      setInvoice((prevState) => ({ ...prevState, [name]: event.target.value }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm(invoice)) {
      console.log(invoice);
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
  };
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
                  <TextField
                    variant="filled"
                    name="type"
                    label="Type"
                    value={invoice.type}
                    onChange={handleChange}
                    error={!validatorsInvoice.type(invoice.type)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    variant="filled"
                    name="issuedOn"
                    label="IssuedOn"
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
                    label="DueDate"
                    value={invoice.dueDate}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!validatorsInvoice.dueDate(invoice.dueDate)}
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
                  <TextField
                    variant="filled"
                    name="status"
                    label="Status"
                    value={invoice.status}
                    onChange={handleChange}
                    error={!validatorsInvoice.status(invoice.status)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="filled"
                    name="clinic"
                    label="Clinic"
                    value={invoice.clinic}
                    onChange={handleChange}
                    error={!validatorsInvoice.clinic(invoice.clinic)}
                    fullWidth
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
