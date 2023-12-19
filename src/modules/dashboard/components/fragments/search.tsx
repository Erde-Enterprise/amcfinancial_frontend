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
import { snackActions } from "../../../../utils/notification/snackbar-util";

function SearchInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateSearch, setIsDateSearch] = useState(false);
  const { getInvoices, getUniqueInvoice } = useDashboard();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDateSearch) {
      await getInvoices(startDate, endDate);
    } else {
      if (invoiceNumber === "" || invoiceNumber === undefined) {
        await getInvoices();
        return;
      }
      await getUniqueInvoice(invoiceNumber);
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{flex:1}}
    >
      <Grid item sx={{flex:1}}>
        <FormControlLabel sx={{flex:1}}
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
      <Grid item sx={{flex:1}}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={1} sx={{flex:1}}>
            <Grid item xs={12} sx={{flex:1}}>
              {!isDateSearch && (
                <TextField
                sx={{flex:1}}
                  label="Invoice Number"
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
                <Grid sx={{flex:1}} container spacing={1}>
                  <Grid item sx={{flex:1}}>
                    <TextField
                    sx={{flex:1}}
                      label="Issued Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{flex:1}}>
                    <TextField
                    sx={{flex:1}}
                      label="Due Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{flex:1}}>
                    <SearchButtonForm sx={{flex:1}}/>
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
