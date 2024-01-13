import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormEvent, ReactElement, useContext, useState } from "react";
import { SearchButtonForm } from "../../../../components/header/buttons/Search-Button-Form";
import useDashboard from "../../hooks/use-dashboard";
import AuthContext from "../../../../auth/auth";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';


interface SearchInvoiceProps {
  additionalComponents: ReactElement[];
}

function SearchInvoice({ additionalComponents }: SearchInvoiceProps) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateSearch, setIsDateSearch] = useState(false);
  const { getInvoices, getUniqueInvoice } = useDashboard();
  const { user } = useContext(AuthContext);

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
      sx={{ flex: 1 }}
    >
      <Grid item sx={{ flex: 1 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={1} sx={{ flex: 1 }}>
            <Grid item xs={12} sx={{ flex: 1 }}>
              {!isDateSearch && (
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      label="Rechnungsnummer"
                      value={invoiceNumber}
                      variant="outlined"
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchButtonForm fontSize="large"/>
                          </InputAdornment>
                        ),
                        sx: { borderRadius: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                  <Grid container>
                    <Grid item>
                    <IconButton onClick={(e) => setIsDateSearch(!isDateSearch)}>
                      <CalendarMonthRoundedIcon fontSize="large" />
                    </IconButton>
                    </Grid>
                    {additionalComponents.map((Component, index) => (
                      <Grid item key={index+2}>{Component}</Grid>
                    ))}
                  </Grid>
                  </Grid>
                </Grid>
              )}
              {isDateSearch && (
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      label="Ausgegeben am"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Fälligkeitsdatum"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputProps={{
                        sx: { borderRadius: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                  <Grid container>
                    <Grid item>
                    <SearchButtonForm fontSize="large" />
                    </Grid>
                    <Grid item>
                    <IconButton onClick={(e) => setIsDateSearch(!isDateSearch)}>
                      <CalendarMonthRoundedIcon fontSize="large" />
                    </IconButton>
                    </Grid>
                    {additionalComponents.map((Component, index) => (
                      <Grid item key={index+2}>{Component}</Grid>
                    ))}
                  </Grid>
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
