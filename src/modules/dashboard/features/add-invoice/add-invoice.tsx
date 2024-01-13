import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { TextField, Button, Container, Grid, InputLabel } from "@mui/material";
import { InvoiceInsertEntity } from "./model/add-invoice.entity";
import {
  styleInputTextField,
  validateForm,
  validatorsInvoice,
} from "../../utils/utils";
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import { ResetButtonForm } from "../../../../components/header/buttons/Reset-Form-Button";
import { SubmitButtonForm } from "../../../../components/header/buttons/Submit-Form-Button";
import useDashboard from "../../hooks/use-dashboard";
import { CustomType } from "../../../../components/inputs/input-type";
import { CustomTypeEnum } from "../../../../components/inputs/enum/type.enum";
import useClinic from "../../../clinics/hooks/use-clinics";
import { StatusInvoiceEnum } from "./enum/add-invoice.enum";

export function AddInvoice() {
  const [fileName, setFileName] = useState("");
  const { clinic, getAllClinics } = useClinic();
  const { registerInvoice } = useDashboard();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [invoice, setInvoice] = useState<InvoiceInsertEntity>({
    rechnung: "",
    name: "",
    price: "",
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    name?: string
  ) => {
    const targetName = name ?? event.target.name;
    let targetValue = event.target.value;
    if (targetName === "mahnung") {
      const numericValue = Number(targetValue);
      if (numericValue > 3) {
        targetValue = "3";
      }
    }

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

  useEffect(() => {
    getAllClinics();
  }, []);
  return (
    <>
      <Container sx={{ flexDirection: "column", flex: 1, marginTop: "5%" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={3}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          ><InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Anhang</InputLabel>
            {fileName && <p>Arquivo selecionado: {fileName}</p>}
            <Button
              variant="outlined"
              startIcon={<AttachmentRoundedIcon fontSize="medium" />}
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
            <br />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Rechnung</InputLabel>
                  <TextField
                    name="rechnung"
                    
                    value={invoice.rechnung}
                    onChange={handleChange}
                    error={!validatorsInvoice.rechnung(invoice.rechnung)}
                    fullWidth
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>{"Preis (CHF)"}</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="price"
                    
                    value={invoice.price}
                    onChange={handleChange}
                    error={!validatorsInvoice.price(invoice.price)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Mahnung</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="mahnung"
                    
                    value={invoice.mahnung}
                    onChange={handleChange}
                    error={!validatorsInvoice.mahnung(invoice.mahnung)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Typ</InputLabel>
                  <CustomType
                    variant="outlined"
                    
                    value={invoice.type}
                    onChange={(event: any) => handleChange(event, "type")}
                    error={!validatorsInvoice.type(invoice.type)}
                    itens={Object.values(CustomTypeEnum)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={4.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Name</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="name"
                    
                    value={invoice.name}
                    onChange={handleChange}
                    error={!validatorsInvoice.name(invoice.name)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Status</InputLabel>
                  <CustomType
                    variant="outlined"
                    
                    value={invoice.status}
                    onChange={(event: any) => handleChange(event, "status")}
                    error={!validatorsInvoice.status(invoice.status)}
                    itens={Object.values(StatusInvoiceEnum)}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Geplant</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="scheduledDate"
                    
                    value={invoice.scheduledDate}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={
                      invoice.status === StatusInvoiceEnum.S &&
                      invoice.scheduledDate === ""
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Lokal</InputLabel>
                  <CustomType
                    variant="outlined"
                    
                    value={invoice.clinic}
                    onChange={(event: any) => handleChange(event, "clinic")}
                    error={!validatorsInvoice.clinic(invoice.clinic)}
                    itens={clinic?.clinics?.map((item) => {
                      return item.name;
                    })}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Beschreibung</InputLabel>
                  <TextField
                    multiline
                    rows={4}
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="description"
                    
                    value={invoice.description}
                    onChange={handleChange}
                    error={!validatorsInvoice.description(invoice.description)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Ausgegeben am</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="issuedOn"
                    
                    value={invoice.issuedOn}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!validatorsInvoice.issuedOn(invoice.issuedOn)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3.5}>
                <InputLabel sx={{mb:1, fontSize:20, fontWeight: "bold"}}>Fälligkeitsdatum</InputLabel>
                  <TextField
                    InputProps={{
                      sx: { borderRadius: styleInputTextField },
                    }}
                    name="dueDate"
                   
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
              <Grid
                container
                spacing={2}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
              >
                <Grid item xs={3.5}>
                  <ResetButtonForm handleReset={handleReset} />
                  <SubmitButtonForm sx={{ml: 1}} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
