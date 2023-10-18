import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routers from "./routes";

function AppRoutes() {
    return (
        <Router>
        <Routes>
          {routers.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} index={route.index} />
          ))}
        </Routes>
      </Router>
    );
  }

export default AppRoutes;