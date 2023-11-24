import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/notification/snackbar-util";
import AppRoutes from "./routes/app-routes";
import { AuthProvider } from "./auth/auth";
import { InvoiceProvider } from "./modules/dashboard/context/invoice-context";
import { ClinicsProvider } from "./modules/clinics/context/clinics-context";
import { UsersProvider } from "./modules/users/context/users-context";

function App() {
  return (
    <div style={{ height: 700 }}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {" "}
        <SnackbarUtilsConfigurator />
        <AuthProvider>
          <UsersProvider>
          <ClinicsProvider>
          <InvoiceProvider>
          <AppRoutes />
          </InvoiceProvider>
          </ClinicsProvider>
          </UsersProvider>
        </AuthProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
