import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routers from "./routes";
import PrivateRoute from "./private-routes";

function AppRoutes() {
  return (
      <Router>
      <Routes>
        {routers.map((route) => (
          route.key === 'login-page' || route.key === 'root' ? 
          <Route key={route.key} path={route.path} element={route.element} /> :
          <Route key={route.key} path={route.path as string} element={<PrivateRoute component={route.element} />}/>
        ))}
      </Routes>
    </Router>
  );
}

export default AppRoutes;