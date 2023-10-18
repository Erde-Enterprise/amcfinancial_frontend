import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/notification/snackbar-util";
import AppRoutes from "./routes/app-routes";

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
        <AppRoutes />
      </SnackbarProvider>
    </div>
  );
}

export default App;
