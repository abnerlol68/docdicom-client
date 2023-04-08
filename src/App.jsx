import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// App's layouts Imports
import Dashboard from "app/layouts/dashboard";
import Landing from "app/layouts/landing";
import Login from "app/layouts/login";
import Signup from "app/layouts/signup";
import NotFound from "app/layouts/not-found";

const App = () => {
  return (
    <Routes>
      {/* App */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="landing/*" element={<Landing />} />
      <Route path="login/*" element={<Login />} />
      <Route path="signup/*" element={<Signup />} />
      <Route path="not-found/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
