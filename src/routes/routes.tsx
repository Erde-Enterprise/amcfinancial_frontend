import { DashboardPage } from "../modules/dashboard/dashboard";
import { UsersPage } from "../modules/users/users";
import { ClinicsPage } from "../modules/clinics/clinics";
import { ActivityHistoryPage } from "../modules/activity-history/activity-history";
import { LoginPage } from "../modules/login/login";

interface AmcFinancialRoutes {
  path?: string;
  index?: boolean | undefined;
  key: string;
  element: any;
}

const routers: AmcFinancialRoutes[] = [
  {
    index: true,
    key: "login",
    element: <LoginPage />,
  },
  {
    path:'/dashboard',
    key:'dashboard-page',
    element: <DashboardPage/>
  },
  {
    path:'/users',
    key:'users-page',
    element: <UsersPage/>
  },
  {
    path:'/clinics',
    key:'clinics-page',
    element: <ClinicsPage/>
  },
  {
    path:'/activity-history',
    key:'activity-history-page',
    element: <ActivityHistoryPage/>
  },
];

export default routers;
