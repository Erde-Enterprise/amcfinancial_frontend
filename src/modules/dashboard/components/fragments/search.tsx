import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { SearchButtonForm } from "../../../../components/header/buttons/Search-Button-Form";
import useDashboard from "../../hooks/use-dashboard";

function SearchInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateSearch, setIsDateSearch] = useState(false);
  const {getInvoices, getUniqueInvoice} = useDashboard();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDateSearch) {
      await getInvoices(startDate, endDate);
    }
    else{
      await getUniqueInvoice(invoiceNumber);
    }
  };

  return (
    <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDateSearch}
            onChange={(e) => setIsDateSearch(e.target.checked)}
            color="primary"
          />
        }
        label="Date Search"
      />
      </Grid>
      <Grid item>
      <form onSubmit={handleSearch}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {!isDateSearch && (
              <TextField
                label="Número da Invoice"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchButtonForm />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {isDateSearch && (
              <Grid container spacing={1}>
                <Grid item>
                <TextField
                  label="Data Inicial"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                </Grid>
                <Grid item>
                <TextField
                  label="Data Final"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                </Grid>
                <Grid item>
                <SearchButtonForm />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
      </Grid>
    </Grid>
  );
}

export default SearchInvoice;
