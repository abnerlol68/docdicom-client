import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// App's layouts Imports
import Dashboard from "app/layouts/dashboard";
import Landing from "app/layouts/landing";
import Login from "app/layouts/login";
import Signup from "app/layouts/signup";
import NotFound from "app/layouts/not-found";

import { UserCtx } from "app/context/UserCtx";

import ProtectRoute from "components/ProtectRoute";

const App = () => {
  const { isLogged } = useContext(UserCtx);

  return (
    <Routes>
      {/* App */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {/* Access protect to dashboard */}
      <Route
        element={<ProtectRoute isAllowed={!isLogged} redirectTo="/landing" />}
      >
        <Route path="dashboard/*" element={<Dashboard />} />
      </Route>
      {/* Deny access if logged in */}
      <Route
        element={<ProtectRoute isAllowed={isLogged} redirectTo="/dashboard" />}
      >
        <Route path="landing/*" element={<Landing />} />
        <Route path="login/*" element={<Login />} />
        <Route path="signup/*" element={<Signup />} />
      </Route>
      <Route path="not-found/*" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
