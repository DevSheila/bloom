import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./app/LoginPage/LoginPage";
import NotFound from "./app/NotFound/NotFound";
import Dashboard from "./app/Dashboard/Dashboard";
import LandingPage from "./app/LandingPage/LandingPage";
import SpinLoader from "./elements/Loaders/SpinLoader";
import { useUser } from "@clerk/clerk-react";
import DiagnosisPage from "./app/DiagnosisPage";
import DiagnosisesPage from "./app/DiagnosisesPage";

const PrivateRoute = ({ element }) => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="mt-7 flex flex-col gap-2">
        <div className="inline-flex items-center justify-center gap-2">
          <SpinLoader />
        </div>
      </div>
    );
  }

  return isSignedIn ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />} //Protected route
          />
          <Route path="/diagnosis/:id" element={<DiagnosisPage />} />
          <Route path="/diagnosis" element={<DiagnosisesPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
