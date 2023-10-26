import { DashboardPage } from "../modules/dashboard/dashboard";
import { UsersPage } from "../modules/users/users";
import { ClinicsPage } from "../modules/clinics/clinics";
import { ActivityHistoryPage } from "../modules/activity-history/activity-history";
import { LoginPage } from "../modules/login/login";
import { AddInvoice } from "../modules/dashboard/features/add-invoice/add-invoice";

interface AmcFinancialRoutes {
  path?: string;
  index?: boolean | undefined;
  key: string;
  element: any;
}
/*
Para rotas privadas deve-se passar como se fosse uma referência/função etc
Para a rota pública, ou seja Login deve passar o componente diretamente.
*/
const routers: AmcFinancialRoutes[] = [
  {
    index: true,
    path: "/",
    key: "root",
    element: <LoginPage/>,
  },
  {
    path: "/login",
    key: "login-page",
    element: <LoginPage/>,
  },
  {
    path: "/dashboard",
    key: "dashboard-page",
    element: DashboardPage,
  },
  {
    path: "/users",
    key: "users-page",
    element: UsersPage,
  },
  {
    path: "/clinics",
    key: "clinics-page",
    element: ClinicsPage,
  },
  {
    path: "/activity-history",
    key: "activity-history-page",
    element: ActivityHistoryPage,
  },
  {
    path: "/new-invoice",
    key: "new-invoice-page",
    element: AddInvoice,
  },
];

export default routers;
