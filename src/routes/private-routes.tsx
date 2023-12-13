import { ElementType, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../auth/auth";
import { Container } from "@mui/material";
import { Header } from "../components/header/header";
import { DashboardPage } from "../modules/dashboard/dashboard";
import { AddInvoice } from "../modules/dashboard/features/add-invoice/add-invoice";

interface PrivateRouteProps {
  component: ElementType;
}

// function PrivateRoute({ component: Component }: PrivateRouteProps) {
//   const { user } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   const handleMenuOpen = () => {
//     setOpen(true);
//   };

//   const handleMenuClose = () => {
//     setOpen(false);
//   };

//   return user?.token ? (
//     <>
//       <Header
//         handleMenuOpen={handleMenuOpen}
//         handleMenuClose={handleMenuClose}
//         open={open}
//       />
//       <Container
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           marginLeft: open ? "20%" : "auto",
//           flexDirection: "column",
//           gap: "0.1rem",
//         }}
//       >
//         <Component />
//       </Container>
//     </>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

// export default PrivateRoute;
function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  
  if (user.type !== 0 && Component !== DashboardPage && !(user.type === 2 && Component === AddInvoice)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Header
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        open={open}
      />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: open ? "20%" : "auto",
          flexDirection: "column",
          gap: "0.1rem",
        }}
      >
        <Component />
      </Container>
    </>
  );
}

export default PrivateRoute;
