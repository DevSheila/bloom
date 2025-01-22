import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./app/Dashboard/Dashboard";
import NotFound from "./app/NotFound/NotFound";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
