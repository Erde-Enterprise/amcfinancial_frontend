import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { InvoiceInsertEntity } from "./model/add-invoice.entity";
import { validateForm } from "../../utils/utils";
import useEndPoint from "../../../../auth/endpoints";


export function AddInvoice() {
  const { goToDashboardInCancelButton } = useEndPoint();
  const [invoice, setInvoice] = useState<InvoiceInsertEntity>({
    rechnung: "",
    name: "",
    price: 0,
    dueDate: "",
    mahnung: 0,
    description: "",
    issuedOn: "",
    attachment: "",
    status: "",
    type: "",
    clinic: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInvoice({
      ...invoice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm(invoice)) {
      console.log(invoice);
    }
  };

  const handleCancel = () => {
    goToDashboardInCancelButton();
  };
  return (
    <>
    <Container sx={{ flexDirection: "column", flex: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="rechnung"
                  label="Rechnung"
                  value={invoice.rechnung}
                  onChange={handleChange}
                  error={invoice.rechnung === "" ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="name"
                  label="Name"
                  value={invoice.name}
                  onChange={handleChange}
                  error={invoice.name === "" ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="price"
                  label="Price"
                  value={invoice.price}
                  onChange={handleChange}
                  type="number"
                  error={invoice.price === 0 ? true : false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="dueDate"
                  label="Due Date"
                  value={invoice.dueDate}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={invoice.dueDate === "" ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="mahnung"
                  label="Mahnung"
                  value={invoice.mahnung}
                  onChange={handleChange}
                  type="number"
                  error={invoice.mahnung < 0 ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="description"
                  label="Description"
                  value={invoice.description}
                  onChange={handleChange}
                  error={invoice.description === "" ? true : false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="issuedOn"
                  label="Issued On"
                  value={invoice.issuedOn}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={invoice.issuedOn === "" ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="attachment"
                  label="Attachment"
                  value={invoice.attachment}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="status"
                  label="Status"
                  value={invoice.status}
                  onChange={handleChange}
                  error={invoice.status === "" ? true : false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  name="type"
                  label="Type"
                  value={invoice.type}
                  onChange={handleChange}
                  error={invoice.type === "" ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="clinic"
                  label="Clinic"
                  value={invoice.clinic}
                  onChange={handleChange}
                  error={invoice.clinic === "" ? true : false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button color="inherit" onClick={handleCancel}>
                  {" "}
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
  );
}
