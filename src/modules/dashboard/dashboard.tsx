import { Box, CircularProgress } from "@mui/material";
import { Table } from "./components/table/table";
import { useContext } from "react";
import AuthContext from "../../auth/auth";

export function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user?.token ? (
        <>
          <Table />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </>
  );
}
