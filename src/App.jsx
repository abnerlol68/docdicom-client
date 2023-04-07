import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

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

      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
    </Routes>
  );
};

export default App;
